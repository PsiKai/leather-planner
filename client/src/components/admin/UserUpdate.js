import React, { useEffect, useContext, useState } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"

import { deleteUser, submitUserInfoUpdates } from "../../utils/api/analytics"

import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import PersonIcon from "@material-ui/icons/Person"
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined"
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined"

import { CSSTransition } from "react-transition-group"

const UserUpdate = ({ setUserPopup, currentUser }) => {
  const [newUserData, setNewUserData] = useState({})
  const [confirmationModal, setConfirmationModal] = useState(false)
  const { dispatch } = useContext(AnalyticsContext)

  useEffect(() => {
    if (currentUser) setNewUserData({ admin: currentUser.admin })
    else setUserPopup(false)
  }, [currentUser, setUserPopup, currentUser?.admin])

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

  const deleteCurrentUser = () => {
    console.log(currentUser._id)
    deleteUser(currentUser._id)
  }

  return (
    <div className="user-action__container">
      <div className="user-action">
        <div className="user-action--user">
          <h2 className="user-action--info">
            {currentUser?.admin ? <SupervisorAccountIcon /> : <PersonIcon />} {currentUser?.name}
          </h2>
          <p>{currentUser?.email}</p>
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
            New Name:
            <input type="text" value={newUserData.name || ""} onChange={updateUserInfo} name="name" />
          </label>
          <label>
            New Email:
            <input type="email" value={newUserData.email || ""} onChange={updateUserInfo} name="email" />
          </label>
          <label>
            New Password:
            <input type="password" value={newUserData.password || ""} onChange={updateUserInfo} name="password" />
          </label>
          <label className="user-update--admin-label">
            Admin Access:
            <input id="admin-checkbox" type="checkbox" onChange={toggleAdmin} checked={newUserData.admin || false} name="admin" />
            {newUserData.admin ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
          </label>
          <button className="btn" type="submit">
            Update User
          </button>
          <button type="button" className="btn user-delete" onClick={() => setConfirmationModal(true)}>
            Delete User
          </button>
        </form>
      </div>
      <CSSTransition in={confirmationModal} classNames="modal-content" timeout={400} unmountOnExit>
        <div className="modal-backdrop" onClick={() => setConfirmationModal(false)}>
          <div className="confirmation-modal modal">
            <h1>Are you sure you want to delete {currentUser?.name}?</h1>
            <p className="confirmation-text">Please confirm you want to delete this user and all associated lists</p>
            <div className="button-container">
              <button className="btn btn-secondary" onClick={() => setConfirmationModal(false)}>
                Cancel
              </button>
              <button className="btn" onClick={deleteCurrentUser}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default UserUpdate
