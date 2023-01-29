import React, { useContext, useState } from "react"
import AuthContext from "../../context/authentication/AuthContext"
import { setAlert } from "../../utils/alert"
import { login } from "../../utils/api/user"
import Modal from "../Modal"
import PasswordInput from "../PasswordInput"

const LoginModal = props => {
  const { onDismiss } = props
  const { dispatch } = useContext(AuthContext)

  const [user, setUser] = useState({ email: "", password: "" })
  const { email, password } = user

  const [loading, setLoading] = useState(false)

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const popValidationToast = msg => setAlert({ status: 400, msg }, dispatch)

  const onSubmit = async e => {
    e.preventDefault()
    let errors = []
    if (email.length === 0 || !email.includes("@")) {
      errors.push("Valid email is required")
    }
    if (password.length === 0) errors.push("Please enter your password")
    if (errors.length) {
      popValidationToast(errors.join("\r\n"))
      return
    }

    setLoading(true)
    const loginSuccess = await login({ email, password }, dispatch, "login")
    if (loginSuccess) {
      setUser({ email: "", password: "" })
      onDismiss()
    }
    setLoading(false)
  }

  return (
    <Modal {...props}>
      <h2 className="modal-title">Login to your account</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="email-login">
          <p>Email:</p>
        </label>
        <input type="email" name="email" id="email-login" value={email} onChange={onChange} autoFocus />
        <PasswordInput onChange={onChange} passwordValue={password} />
        <button type="submit" className="btn modal-action" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </Modal>
  )
}

export default LoginModal
