import React, { useContext, useState, useRef } from "react"
import AuthContext from "../../context/authentication/AuthContext"
import { setAlert } from "../../utils/alert"
import { login } from "../../utils/api/user"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

const LoginModal = ({ openLogin }) => {
  const { dispatch } = useContext(AuthContext)

  const [user, setUser] = useState({ email: "", password: "" })
  const { email, password } = user

  const [showPassword, setShowPassword] = useState(false)
  const passwordInput = useRef()

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const validationType = msg => setAlert({ status: 400, msg }, dispatch)

  const onSubmit = e => {
    e.preventDefault()
    let validated = true
    if (email.length === 0 || !email.includes("@")) {
      validationType("Valid email is required")
      validated = false
    }
    if (password.length === 0) {
      validationType("Please enter your password")
      validated = false
    }
    if (validated) {
      login({ email, password }, dispatch, "login")
      setUser({ email: "", password: "" })
      openLogin(false)
      setShowPassword(false)
      passwordInput.current.type = "password"
    }
  }

  const closeModal = e => {
    if (e.target.classList.contains("modal-backdrop")) {
      openLogin(false)
      setShowPassword(false)
      passwordInput.current.type = "password"
    }
  }

  const revealPassword = type => {
    setShowPassword(!showPassword)
    passwordInput.current.type = type
  }

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div id="loginModal" className="modal">
        <form onSubmit={onSubmit}>
          <p>Email</p>
          <input type="email" name="email" value={email} onChange={onChange} />
          <p>Password</p>
          <div className="password-input">
            <input type="password" name="password" value={password} onChange={onChange} ref={passwordInput} />
            {showPassword ? (
              <VisibilityIcon onClick={() => revealPassword("password")} />
            ) : (
              <VisibilityOffIcon onClick={() => revealPassword("text")} />
            )}
          </div>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginModal
