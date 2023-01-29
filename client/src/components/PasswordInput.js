import React, { useState } from "react"

import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"

const PasswordInput = ({ onChange, passwordValue, id = null, label, name }) => {
  const [showPassword, setShowPassword] = useState(false)

  const revealPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <label htmlFor={id || "password-login"}>
        <p>{label || "Password"}:</p>
      </label>
      <div className="password-input">
        <input
          id={id || "password-login"}
          type={showPassword ? "text" : "password"}
          name={name || "password"}
          value={passwordValue}
          onChange={onChange}
        />
        <button type="button" className="password-visibility" onClick={revealPassword}>
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </div>
    </>
  )
}

export default PasswordInput
