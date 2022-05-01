import React, { useContext, useEffect, useCallback, useState } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"

import { CSSTransition } from "react-transition-group"

import { createUserSnapshot, getAllUsers, submitUserInfoUpdates, sumUsers } from "../../utils/api/analytics"
import { getLocaleDate } from "../../utils/dates"

import { CircularProgress } from "@material-ui/core"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
import PageNav from "../layout/PageNav"

const UserData = () => {
  const analyticsContext = useContext(AnalyticsContext)
  const {
    state: { users, loading, latestSnapshot, totalUsers },
    dispatch,
  } = analyticsContext

  const [currentUser, setCurrentUser] = useState()
  const [userPopup, setUserPopup] = useState(false)

  var resultsPerPage = 10

  useEffect(() => sumUsers(dispatch), [dispatch])

  const changePages = useCallback(
    page => {
      dispatch({ type: "SET_LOADING" })
      getAllUsers(page, resultsPerPage, dispatch)
      setCurrentUser()
    },
    [dispatch, resultsPerPage]
  )

  useEffect(() => {
    if (!loading) {
      const currentData = users.map(user => {
        const { _id, name, logins, lastLogin, lists } = user
        return { _id, name, logins, lastLogin, totalLists: lists.length }
      })
      createUserSnapshot(currentData)
    }
  }, [users, loading])

  const listAverage = lists => {
    const total = lists.reduce((length, list) => (length += list.length), 0)
    const average = total ? (total / lists.length).toFixed(1) : "---"
    return <td className="number">{average}</td>
  }

  const tableData = (key, value, i) => {
    const updated = isUpdated(key, value, i)
    return <td className={`${updated} ${typeof value}`}>{value}</td>
  }

  const dateComparison = (key, newDate, i) => {
    const updated = key === "createdAt" ? isNewUser(i) : isUpdated(key, newDate, i)
    return <td className={`${updated} date-of`}>{getLocaleDate(newDate, dateOptions)}</td>
  }

  const dateOptions = { month: "2-digit", day: "2-digit", year: "numeric" }
  const isUpdated = (key, value, i) => (latestSnapshot.userData[i]?.[key] === value ? "" : "updated")
  const isNewUser = i => (latestSnapshot.userData[i] ? "" : "updated")

  const openUserAction = e => {
    const user = users.find(u => u._id === e.currentTarget.getAttribute("data-user"))
    setCurrentUser(user)
    setUserPopup(true)
  }

  const [newUserData, setNewUserData] = useState({})

  useEffect(() => {
    if (currentUser) setNewUserData({ admin: currentUser.admin })
    else setUserPopup(false)
  }, [currentUser])

  const updateUserInfo = e => {
    const { name, value } = e.target
    if (value) {
      setNewUserData(prev => ({ ...prev, [name]: value }))
    } else {
      setNewUserData(prev => {
        let newData = { ...prev }
        delete newData[name]
        return newData
      })
    }
  }

  const toggleAdmin = e => {
    setNewUserData(prev => ({ ...prev, admin: e.target.checked }))
  }

  const submitUserInfo = e => {
    e.preventDefault()
    submitUserInfoUpdates({ updates: newUserData, _id: currentUser._id }, dispatch)
    setNewUserData({})
  }

  return (
    <div className="analytics-content">
      <div>
        <table className="user-dashboard">
          <thead>
            <tr>
              <th className="string">User Name</th>
              <th className="date-of">Created</th>
              <th className="date-of">Last Login</th>
              <th className="number">Logins</th>
              <th className="number">Lists</th>
              <th className="number">Avg List</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              users?.map((user, i) => (
                <tr key={user._id} data-user={user._id} onClick={openUserAction} className="table-user">
                  {tableData("name", user.name, i)}
                  {dateComparison("createdAt", user.createdAt, i)}
                  {dateComparison("lastLogin", user.lastLogin, i)}
                  {tableData("logins", user.logins, i)}
                  {tableData("totalLists", user.lists.length, i)}
                  {listAverage(user.lists)}
                </tr>
              ))
            ) : (
              <tr className="loading">
                <td>
                  <CircularProgress />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PageNav loading={loading} resultsPerPage={resultsPerPage} totalRecords={totalUsers} changePages={changePages} />
      </div>
      <CSSTransition in={userPopup} classNames="modal-content" timeout={150} unmountOnExit>
        <div className="user-action__container">
          <div className="user-action">
            <div className="user-action--user">
              <h2>{currentUser?.name}</h2>
              <p>{currentUser?.email}</p>
              {/* <p>{currentUser?.lists.length}</p> */}
              <p className="user-activity">
                Last login: {`${Math.floor((new Date() - new Date(currentUser?.lastLogin)) / 1000 / 60 / 60 / 24)}`} days ago
              </p>
              <p className="badge">{currentUser?.admin ? "Admin" : "User"}</p>
              <button className="close-user-popup" onClick={() => setUserPopup(false)}>
                <CloseOutlinedIcon />
              </button>
            </div>
            <form className="user-update-form" onSubmit={submitUserInfo}>
              <h3>Update user info</h3>
              <label>
                New Name
                <input type="text" value={newUserData.name || ""} onChange={updateUserInfo} name="name" />
              </label>
              <label>
                New Email
                <input type="email" value={newUserData.email || ""} onChange={updateUserInfo} name="email" />
              </label>
              <label>
                New Password
                <input type="password" value={newUserData.password || ""} onChange={updateUserInfo} name="password" />
              </label>
              <label>
                {newUserData.admin ? "Revoke Admin" : "Grant Admin"}
                <input type="checkbox" onChange={toggleAdmin} checked={newUserData.admin || false} name="admin" />
              </label>
              <button type="submit">Update User</button>
            </form>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default UserData
