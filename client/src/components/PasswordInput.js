import React, { useState } from "react"

import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

const PasswordInput = ({ onChange, passwordValue, id = null, label, name, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const revealPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {label ? (
        <label htmlFor={id || "password-login"}>
          <p>{label}:</p>
        </label>
      ) : null}
      <div className="password-input">
        <input
          {...props}
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
