import React, { useReducer } from "react"
import { v4 as uuidv4 } from "uuid"
import AuthContext from "./AuthContext"
import authReducer from "./AuthReducer"
import { LOG_OUT } from "../types/types"

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

  const logOut = () => dispatch({ type: LOG_OUT })

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        alerts: state.alerts,
        isAdmin: state.isAdmin,
        logOut,
        state,
        dispatch,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState
