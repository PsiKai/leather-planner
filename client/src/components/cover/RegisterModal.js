import React, { useContext, useState } from "react"
import AuthContext from "../../context/authentication/AuthContext"
import { setAlert } from "../../utils/alert"
import { login } from "../../utils/api/user"
import Modal from "../Modal"
import PasswordInput from "../PasswordInput"

const RegisterModal = props => {
  const { onDismiss } = props
  const { dispatch } = useContext(AuthContext)

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    passwordTwo: "",
  })
  const { email, password, name, passwordTwo } = user

  const [loading, setLoading] = useState(false)

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

  const popValidationToast = msg => setAlert({ status: 400, msg }, dispatch)

  const onSubmit = async e => {
    e.preventDefault()
    let errors = []
    if (name.length === 0) errors.push("Name is required")
    if (email.length === 0 || !email.includes("@")) {
      errors.push("Valid email is required")
    }
    if (password.length < 6) errors.push("Password must be 6 or more characters")
    if (password !== passwordTwo) errors.push("Passwords must match")
    if (errors.length) {
      popValidationToast(errors.join("\r\n"))
      return
    }

    setLoading(true)
    const registerSuccess = await login({ name, email, password }, dispatch, "register")
    if (registerSuccess) {
      setUser({
        name: "",
        email: "",
        password: "",
        passwordTwo: "",
      })
      onDismiss()
    }
    setLoading(false)
  }

  return (
    <Modal {...props}>
      <h2 className="modal-title">Register your account</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name-register">
          <p>Name:</p>
        </label>
        <input
          id="name-register"
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          autoComplete="off"
          autoFocus
          spellCheck="false"
        />
        <label htmlFor="email-register">
          <p>Email:</p>
        </label>
        <input
          id="email-register"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          autoComplete="off"
        />
        <PasswordInput passwordValue={password} onChange={onChange} />
        <PasswordInput
          passwordValue={passwordTwo}
          onChange={onChange}
          id="confirm-password"
          label="Confirm Password"
          name="passwordTwo"
        />
        <button type="submit" className="btn modal-action" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </Modal>
  )
}

export default RegisterModal
