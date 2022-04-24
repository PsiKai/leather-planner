import React, { useReducer } from "react"
import AuthContext from "./AuthContext"
import authReducer from "./AuthReducer"

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

  return <AuthContext.Provider value={{ state, dispatch }}>{props.children}</AuthContext.Provider>
}

export default AuthState
