import React, { useReducer } from "react"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import AuthContext from "./AuthContext"
import authReducer from "./AuthReducer"
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOG_OUT, SET_ALERT, REMOVE_ALERT } from "../types/types"

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    alerts: [],
    isAdmin: false,
  }

  const [state, dispatch] = useReducer(authReducer, initialState)

  const register = async formData => {
    try {
      const res = await axios.post("/user/register", formData)
      dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    } catch (err) {
      const {
        data: { msg },
        status,
      } = err.response
      setAlert({ msg, status })
      dispatch({ type: LOG_OUT })
    }
  }

  const login = async formData => {
    try {
      const res = await axios.post("/user/login", formData)
      dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    } catch (err) {
      const {
        data: { msg },
        status,
      } = err.response
      setAlert({ msg, status })
      dispatch({ type: LOG_OUT })
    }
  }

  const logOut = () => dispatch({ type: LOG_OUT })

  const setAlert = ({ msg, status }) => {
    const id = uuidv4()
    dispatch({
      type: SET_ALERT,
      payload: { msg, id, status },
    })
    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT,
        payload: id,
      })
    }, 5000)
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        alerts: state.alerts,
        isAdmin: state.isAdmin,
        register,
        login,
        logOut,
        setAlert,
        state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
