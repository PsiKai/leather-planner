import React, { useContext } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import "../styles/alerts.css"
import AuthContext from "../context/authentication/AuthContext"

import ErrorIcon from "@material-ui/icons/Error"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const Alert = () => {
  const {
    state: { alerts },
  } = useContext(AuthContext)

  return (
    <TransitionGroup className="alert-wrapper">
      {alerts.length > 0 &&
        alerts.map(({ msg, id, status = 200 }) => (
          <CSSTransition timeout={400} classNames="fadein" key={id}>
            <div className="alert-border">
              <div key={id} className="alert">
                {status.toString().includes(2) ? <CheckCircleIcon /> : <ErrorIcon />}
                <span>{msg}</span>
              </div>
            </div>
          </CSSTransition>
        ))}
    </TransitionGroup>
  )
}

export default Alert
