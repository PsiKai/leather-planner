import React, { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../../context/authentication/AuthContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isAuthenticated },
  } = useContext(AuthContext)

  return isAuthenticated || localStorage.token ? <Outlet {...rest} /> : <Navigate to="/" />
}

export default PrivateRoute
