import React, { useState, useContext } from "react"
import authContext from "../../context/authentication/AuthContext"

import { setAlert } from "../../utils/alert"
import { updatePassword } from "../../utils/api/user"

import PasswordInput from "../PasswordInput"

const PasswordField = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(authContext)

  const [passwordFields, setPassword] = useState({ oldPass: "", newPass: "" })
  const { oldPass, newPass } = passwordFields

  const [loading, setLoading] = useState(false)

  const fieldsValid = () => {
    return oldPass.length > 5 && newPass.length > 5
  }

  const submitPassword = async e => {
    e.preventDefault()
    if (fieldsValid()) {
      setLoading(true)
      const updateSuccess = await updatePassword({ ...passwordFields, user }, dispatch)
      if (updateSuccess) setPassword({ oldPass: "", newPass: "" })
    } else {
      setAlert({ status: 400, msg: "Please enter both password fields" }, dispatch)
    }
    setLoading(false)
  }

  const editPassword = e => {
    const { name, value } = e.target
    setPassword(rest => ({ ...rest, [name]: value }))
  }

  return (
    <div className="password-reset">
      <label htmlFor="password-reset" className="profile--label">
        Update Password
      </label>
      <form onSubmit={submitPassword} id="password-reset">
        <PasswordInput
          onChange={editPassword}
          name="oldPass"
          className="new-item browser-default"
          passwordValue={oldPass}
          placeholder="Old Password"
          aria-label="Old password"
          id="old-password"
        />
        <PasswordInput
          onChange={editPassword}
          name="newPass"
          className="new-item browser-default"
          passwordValue={newPass}
          placeholder="New Password"
          aria-label="New password"
          id="new-password"
        />
        <button type="submit" className="btn password--submit" disabled={loading || !fieldsValid()}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  )
}

export default PasswordField
