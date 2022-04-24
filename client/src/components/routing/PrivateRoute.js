import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import AuthContext from "../../context/authentication/AuthContext"

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isAuthenticated, loading },
  } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => (!isAuthenticated && !loading && !localStorage.token ? <Redirect to="/" /> : <Component {...props} />)}
    />
  )
}

export default PrivateRoute
