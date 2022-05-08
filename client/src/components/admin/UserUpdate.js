import React, { useEffect, useContext, useState } from "react"
import AnalyticsContext from "../../context/analytics/AnalyticsContext"
import authContext from "../../context/authentication/AuthContext"

import { deleteUser, submitUserInfoUpdates } from "../../utils/api/analytics"

import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import PersonIcon from "@material-ui/icons/Person"
import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined"
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined"

import { CSSTransition } from "react-transition-group"
import ConfirmationModal from "./ConfirmationModal"

const UserUpdate = ({ setUserPopup, currentUser }) => {
  const [newUserData, setNewUserData] = useState({})
  const [confirmationModal, setConfirmationModal] = useState(false)
  const {
    dispatch,
    state: { loading },
  } = useContext(AnalyticsContext)
  const {
    state: { user },
  } = useContext(authContext)

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
    dispatch({ type: "SET_LOADING" })
    submitUserInfoUpdates({ updates: newUserData, _id: currentUser._id }, dispatch)
    setNewUserData({})
  }

  const deleteCurrentUser = async () => {
    dispatch({ type: "SET_LOADING" })
    const confirmedDeletion = await deleteUser(currentUser._id, dispatch)
    setConfirmationModal(!confirmedDeletion)
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
            <input type="text" value={newUserData.name || ""} onChange={updateUserInfo} name="name" autoComplete="off" />
          </label>
          <label>
            New Email:
            <input type="email" value={newUserData.email || ""} onChange={updateUserInfo} name="email" autoComplete="off" />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={newUserData.password || ""}
              onChange={updateUserInfo}
              name="password"
              autoComplete="off"
            />
          </label>
          <label className="user-update--admin-label">
            Admin Access:
            <input
              id="admin-checkbox"
              type="checkbox"
              onChange={toggleAdmin}
              checked={newUserData.admin || false}
              name="admin"
              disabled={currentUser?._id === user._id}
            />
            {newUserData.admin ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
          </label>
          <button className="btn btn-secondary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update User"}
          </button>
          <button
            type="button"
            className="btn user-delete"
            onClick={() => setConfirmationModal(true)}
            disabled={currentUser?._id === user._id}
          >
            Delete User
          </button>
        </form>
      </div>
      <CSSTransition in={confirmationModal} classNames="modal-content" timeout={400} unmountOnExit>
        <ConfirmationModal
          modalOpen={setConfirmationModal}
          confirmAction={deleteCurrentUser}
          currentUser={currentUser}
          pending={loading}
        />
      </CSSTransition>
    </div>
  )
}

export default UserUpdate
