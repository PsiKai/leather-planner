import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect } from 'react'

import AnalyticsContext from '../../context/analytics/AnalyticsContext';

const UserData = () => {
    const analyticsContext = useContext(AnalyticsContext)
    const { getAllUsers, users, loading } = analyticsContext

    useEffect(() => {
        getAllUsers()
        //eslint-disable-next-line
    }, [])

    const listAverage = (lists) => {
        const total = lists.reduce((length, list) => length += list.items.length, 0)
        return total ? (total / lists.length).toFixed(1) : null
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
                {users && users.map(user => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.logins}</td>
                        <td>{new Date(user.lastLogin).toLocaleDateString()}</td>
                        <td>{user.createdAt && new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>{user.lists.length || "--"}</td>
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
