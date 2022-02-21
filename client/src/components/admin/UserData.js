import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'

import AnalyticsContext from '../../context/analytics/AnalyticsContext';

const UserData = () => {
    const analyticsContext = useContext(AnalyticsContext)
    const { getAllUsers, users, loading, createUserSnapshot, latestSnapshot } = analyticsContext

    useEffect(() => {
        getAllUsers()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!loading) {
            const currentData = users.map(user => {
                const { _id, name, logins, lastLogin, lists } = user
                return {
                    _id, name, logins, lastLogin, totalLists: lists.length
                }
            })
            createUserSnapshot(currentData)
        }
    }, [users, createUserSnapshot, loading])

    const listAverage = (lists) => {
        const total = lists.reduce((length, list) => length += list.items.length, 0)
        return total ? (total / lists.length).toFixed(1) : null
    }

    const tableData = (key, value, index) =>  {
        const updated = latestSnapshot.userData?.[index]?.[key] === value ?
            "" : "updated"
        return <td className={`${updated} ${typeof(value)}`}>{value}</td>
    }

    const dateComparison = (newDate, i) => {
        const updated = latestSnapshot.userData[i]?.lastLogin === newDate ?
            "" : "updated"
        return <td className={`${updated} date-of`}>{new Date(newDate).toLocaleDateString('en-US', dateOptions)}</td>
    }

    const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' }

    return (
        !loading ?
            <table className="user-dashboard">
                <thead>
                    <tr>
                        <th className='string'>User Name</th>
                        <th className='date-of'>Created</th>
                        <th className='date-of'>Last Login</th>
                        <th className='number'>Logins</th>
                        <th className='number'>Lists</th>
                        <th className='number'>Avg List</th>
                    </tr>
                </thead>
                <tbody>
                {users && users.map((user, i) => (
                    <tr key={user._id}>
                        {tableData("name", user.name, i)}
                        <td className='date-of'>{user.createdAt && new Date(user.createdAt).toLocaleDateString('en-US', dateOptions)}</td>
                        {dateComparison(user.lastLogin, i)}
                        {tableData("logins", user.logins, i)}
                        {tableData("totalLists", user.lists.length, i)}
                        <td className='number'>{listAverage(user.lists) || "---"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            :
            <div className="loading">
                <CircularProgress/>
            </div>
    )
}

export default UserData
