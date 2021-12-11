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
        const updated = latestSnapshot.userData[index][key] === value ?
            "" : "updated"
        return <td className={updated}>{value}</td>
    }

    const dateComparison = (newDate, i) => {
        const updated = latestSnapshot.userData[i].lastLogin === newDate ?
            "" : "updated"
        return <td className={updated}>{new Date(newDate).toLocaleDateString()}</td>
    }

    return (
        !loading ?
            <table className="user-dashboard">
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>Logins</th>
                        <th>Last Login</th>
                        <th>Created Account</th>
                        <th>Total Lists</th>
                        <th>Avg. List Size</th>
                    </tr>
                </thead>
                <tbody>
                {users && users.map((user, i) => (
                    <tr key={user._id}>
                        {tableData("name", user.name, i)}
                        {tableData("logins", user.logins, i)}
                        {dateComparison(user.lastLogin, i)}
                        <td>{user.createdAt && new Date(user.createdAt).toLocaleDateString()}</td>
                        {tableData("totalLists", user.lists.length, i)}
                        <td>{listAverage(user.lists) || "--"}</td>
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
