import React, { useEffect, useContext, useState } from "react"
import { submitUserInfoUpdates } from "../../utils/api/analytics"
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"

const UserUpdate = ({ setUserPopup, currentUser }) => {
  const [newUserData, setNewUserData] = useState({})
  const { dispatch } = useContext(AnalyticsContext)

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
  )
}

export default UserUpdate
