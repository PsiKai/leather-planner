import React, { useState } from "react"

import CheckBoxOutlineBlankOutlinedIcon from "@material-ui/icons/CheckBoxOutlineBlankOutlined"
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined"

const ConfirmationModal = ({ modalOpen, confirmAction, currentUser, pending }) => {
  const [confirmed, setConfirmed] = useState(false)
  return (
    <div
      className="modal-backdrop"
      onClick={e => {
        if (e.target === e.currentTarget) modalOpen(false)
      }}
    >
      <div className="confirmation-modal modal">
        <h1>Are you sure you want to delete {currentUser?.name}?</h1>
        <p className="confirmation-text">Please confirm you want to delete this user and all associated lists</p>
        <label>
          delete<span>{currentUser?.name}</span>
          <input
            className="confirmation-checkbox"
            type="checkbox"
            checked={confirmed}
            onChange={() => setConfirmed(!confirmed)}
          />
          {confirmed ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />}
        </label>
        <div className="button-container">
          <button className="btn btn-secondary" onClick={() => modalOpen(false)}>
            Cancel
          </button>
          <button className="btn" onClick={confirmAction} disabled={!confirmed}>
            {pending ? "Deleting..." : "Confirm Delete"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
