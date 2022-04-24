import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import AuthContext from "../../context/authentication/AuthContext"

const AdminRoute = ({ component: Component, ...rest }) => {
  const {
    state: { isAdmin, loading },
  } = useContext(AuthContext)

  return <Route {...rest} render={props => (!isAdmin && !loading ? <Redirect to="/" /> : <Component {...props} />)} />
}

export default AdminRoute
