import React, { useContext, useEffect, useCallback, useState, useRef } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"

import { CSSTransition } from "react-transition-group"

import { createUserSnapshot, getAllUsers } from "../../utils/api/analytics"
import { getLocaleDate } from "../../utils/dates"

import { CircularProgress } from "@material-ui/core"
import PageNav from "../layout/PageNav"
import UserUpdate from "./UserUpdate"
import UserSearchbar from "./UserSearchbar"

const UserData = () => {
  const analyticsContext = useContext(AnalyticsContext)
  const {
    state: { users, loading, latestSnapshot, totalUsers },
    dispatch,
  } = analyticsContext

  const [currentUser, setCurrentUser] = useState()
  const [userPopup, setUserPopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const previousSearchTerm = useRef("")

  const [page, setPage] = useState(0)

  var resultsPerPage = 10

  const changePages = useCallback(() => {
    dispatch({ type: "SET_LOADING" })
    let newPage = page
    if (previousSearchTerm.current !== searchTerm) {
      previousSearchTerm.current = searchTerm
      newPage = 0
    }
    getAllUsers(newPage, resultsPerPage, dispatch, searchTerm || ".*")
    setCurrentUser()
  }, [dispatch, resultsPerPage, searchTerm, page])

  // useEffect(() => setPage(0), [searchTerm])

  useEffect(() => changePages(page), [page, changePages])

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

  return (
    <div className="analytics-content">
      <div>
        <UserSearchbar searchForUser={setSearchTerm} />
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
              totalUsers !== 0 ? (
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
                <tr>
                  <td>
                    <h2>No Records Found</h2>
                  </td>
                </tr>
              )
            ) : (
              <tr className="loading">
                <td>
                  <CircularProgress />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PageNav loading={loading} resultsPerPage={resultsPerPage} totalRecords={totalUsers} setPage={setPage} page={page} />
      </div>
      <CSSTransition in={userPopup} classNames="modal-content" timeout={150} unmountOnExit>
        <UserUpdate setUserPopup={setUserPopup} currentUser={currentUser} />
      </CSSTransition>
    </div>
  )
}

export default UserData
