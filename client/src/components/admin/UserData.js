import React, { useContext, useEffect, useCallback, useState, useRef } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"

import { CSSTransition } from "react-transition-group"

import { createUserSnapshot, getAllUsers } from "../../utils/api/analytics"
import { getLocaleDate } from "../../utils/dates"

import CircularProgress from "@mui/material/CircularProgress"
import PageNav from "../layout/PageNav"
import UserUpdate from "./UserUpdate"
import UserSearchbar from "./UserSearchbar"

const UserData = () => {
  const analyticsContext = useContext(AnalyticsContext)
  const {
    state: { users, loading, totalUsers },
    dispatch,
  } = analyticsContext

  const [currentUser, setCurrentUser] = useState()
  const [userPopup, setUserPopup] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const userUpdateNode = useRef()

  const [page, setPage] = useState(0)

  var resultsPerPage = 10
  const prevSearchTerm = useRef()

  const changePages = useCallback(() => {
    let newPage = page
    if (prevSearchTerm.current !== searchTerm) {
      prevSearchTerm.current = searchTerm
      newPage = 0
      setPage(0)
    }
    dispatch({ type: "SET_LOADING" })
    getAllUsers(newPage, resultsPerPage, dispatch, searchTerm || ".*")
    setCurrentUser()
  }, [dispatch, resultsPerPage, page, searchTerm])

  useEffect(() => {
    changePages()
  }, [page, changePages])

  useEffect(() => {
    createUserSnapshot()
  }, [])

  const listAverage = lists => {
    const total = lists.reduce((length, list) => (length += list.length), 0)
    const average = total ? (total / lists.length).toFixed(1) : "---"
    return <td className="number">{average}</td>
  }

  const tableData = value => <td className={`${typeof value}`}>{value}</td>

  const dateCell = newDate => <td className="date-of">{getLocaleDate(newDate, dateOptions)}</td>

  const dateOptions = { month: "2-digit", day: "2-digit", year: "numeric" }

  const openUserAction = e => {
    const user = users.find(u => u._id === e.currentTarget.getAttribute("data-user"))
    setCurrentUser(user)
    setUserPopup(true)
  }

  return (
    <div className="analytics-content">
      <img
        src="./images/Bald-Eagle.webp"
        className="watermark"
        alt="watermark"
        aria-hidden="true"
      />
      <div className="user-dashboard--container">
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
                users?.map(user => (
                  <tr
                    key={user._id}
                    data-user={user._id}
                    onClick={openUserAction}
                    className="table-user"
                  >
                    {tableData(user.name)}
                    {dateCell(user.createdAt)}
                    {dateCell(user.lastLogin)}
                    {tableData(user.logins)}
                    {tableData(user.lists.length)}
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
        <PageNav
          loading={loading}
          resultsPerPage={resultsPerPage}
          totalRecords={totalUsers}
          setPage={setPage}
          page={page}
        />
      </div>
      <CSSTransition
        nodeRef={userUpdateNode}
        in={userPopup}
        classNames="modal-content"
        timeout={150}
        unmountOnExit
      >
        <UserUpdate
          nodeRef={userUpdateNode}
          setUserPopup={setUserPopup}
          currentUser={currentUser}
        />
      </CSSTransition>
    </div>
  )
}

export default UserData
