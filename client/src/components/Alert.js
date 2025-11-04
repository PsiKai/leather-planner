import React, { useContext, useRef } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"

import "../styles/alerts.css"
import AuthContext from "../context/authentication/AuthContext"

import ErrorIcon from "@mui/icons-material/Error"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const Alert = () => {
  const {
    state: { alerts },
  } = useContext(AuthContext)
  const alertDomElements = useRef({})

  alertDomElements.current = Object.fromEntries(
    (alerts || []).map(({ id }) => [id, React.createRef()]),
  )

  return (
    <TransitionGroup className="alert-wrapper">
      {alerts.length > 0
        ? alerts.map(({ msg, id, status = 200 }) => {
            const errorState = status >= 400
            return (
              <CSSTransition
                nodeRef={alertDomElements.current[id]}
                timeout={400}
                classNames="fadein"
                key={id}
              >
                <div ref={alertDomElements.current[id]} className="alert-border">
                  <div key={id} className="alert">
                    {errorState ? <ErrorIcon /> : <CheckCircleIcon />}
                    <span className={errorState ? "error" : ""}>{msg}</span>
                  </div>
                </div>
              </CSSTransition>
            )
          })
        : null}
    </TransitionGroup>
  )
}

export default Alert
