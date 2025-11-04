import React, { Fragment, useEffect, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginModal from "./LoginModal"
import RegisterModal from "./RegisterModal"
import AuthContext from "../../context/authentication/AuthContext"
import Alert from "../Alert"

const Cover = props => {
  const authContext = useContext(AuthContext)
  const {
    dispatch,
    state: { token },
  } = authContext
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) navigate("/planner/day")
    else dispatch({ type: "LOG_OUT" })
  }, [props.history, dispatch, token])

  return (
    <Fragment>
      <div className="cover">
        <div className="center-div">
          <h1 className="cover-title">DAILY</h1>
          <h1 id="line-two" className="cover-title">
            PLANNER
          </h1>
          <div className="cover-btns">
            <button className="btn" onClick={() => setLogin(true)}>
              Login
            </button>
            <button
              className="btn"
              onClick={() => {
                setRegister(true)
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      <LoginModal onDismiss={() => setLogin(false)} show={login} />
      <RegisterModal onDismiss={() => setRegister(false)} show={register} />
      <Alert />
    </Fragment>
  )
}

export default Cover
