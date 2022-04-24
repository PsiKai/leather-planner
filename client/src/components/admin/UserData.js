import { CircularProgress } from "@material-ui/core"
import React, { useContext, useEffect } from "react"

import AnalyticsContext from "../../context/analytics/AnalyticsContext"
import { createUserSnapshot, getAllUsers } from "../../utils/api/analytics"
import { getLocaleDate } from "../../utils/dates"

const UserData = () => {
  const analyticsContext = useContext(AnalyticsContext)
  const {
    state: { users, loading, latestSnapshot },
    dispatch,
  } = analyticsContext

  useEffect(() => getAllUsers(dispatch), [dispatch])

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

  return !loading ? (
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
        {users?.map((user, i) => (
          <tr key={user._id}>
            {tableData("name", user.name, i)}
            {dateComparison("createdAt", user.createdAt, i)}
            {dateComparison("lastLogin", user.lastLogin, i)}
            {tableData("logins", user.logins, i)}
            {tableData("totalLists", user.lists.length, i)}
            {listAverage(user.lists)}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="loading">
      <CircularProgress />
    </div>
  )
}

export default UserData
