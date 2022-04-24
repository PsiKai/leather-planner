import React, { useState, useContext, useRef } from "react"
import authContext from "../../context/authentication/AuthContext"

import { setAlert } from "../../utils/alert"
import { updatePassword } from "../../utils/api/user"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

const PasswordField = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(authContext)
  const [password, setPassword] = useState({ oldPass: "", newPass: "" })

  const [showPassword, setShowPassword] = useState(false)
  const passwordInput = useRef()
  const [showPasswordTwo, setShowPasswordTwo] = useState(false)
  const passwordInputTwo = useRef()

  const submitPassword = async e => {
    e.preventDefault()
    if (password.oldPass && password.newPass) {
      updatePassword({ ...password, user }, dispatch)
      setPassword({ oldPass: "", newPass: "" })
      setShowPassword(false)
      setShowPasswordTwo(false)
      passwordInput.current.type = "password"
      passwordInputTwo.current.type = "password"
    } else {
      setAlert({ status: 400, msg: "Please enter both password fields" }, dispatch)
    }
  }

  const editPassword = e => {
    const { name, value } = e.target
    setPassword(rest => {
      return { ...rest, [name]: value }
    })
  }

  const revealPassword = type => {
    setShowPassword(!showPassword)
    passwordInput.current.type = type
  }

  const revealPasswordTwo = type => {
    setShowPasswordTwo(!showPasswordTwo)
    passwordInputTwo.current.type = type
  }

  return (
    <div className="password-reset">
      <label className="profile--label">Update Password</label>
      <form onSubmit={submitPassword}>
        <div className="password-input">
          <input
            className="new-item browser-default"
            name="oldPass"
            type="password"
            onChange={editPassword}
            value={password.oldPass}
            placeholder="Old Password"
            aria-label="Enter old password"
            ref={passwordInput}
          />
          {showPassword ? (
            <VisibilityIcon onClick={() => revealPassword("password")} />
          ) : (
            <VisibilityOffIcon onClick={() => revealPassword("text")} />
          )}
        </div>
        <div className="password-input">
          <input
            className="new-item browser-default"
            name="newPass"
            type="password"
            onChange={editPassword}
            value={password.newPass}
            placeholder="New Password"
            aria-label="Enter new password"
            ref={passwordInputTwo}
          />
          {showPasswordTwo ? (
            <VisibilityIcon onClick={() => revealPasswordTwo("password")} />
          ) : (
            <VisibilityOffIcon onClick={() => revealPasswordTwo("text")} />
          )}
        </div>
        <button type="submit" className="btn password--submit">
          Save Password
        </button>
      </form>
    </div>
  )
}

export default PasswordField
