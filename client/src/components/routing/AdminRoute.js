import React, { useContext, useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import AuthContext from "../../context/authentication/AuthContext"
import { userIsAdmin } from "../../utils/api/user"

const AdminRoute = ({ component: Component, ...rest }) => {
  const {
    state: { user },
  } = useContext(AuthContext)

  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userIsAdmin().then(res => {
      setAdmin(res)
      setLoading(false)
    })
  }, [user])

  return <Route {...rest} render={props => (!admin && !loading ? <Redirect to="/" /> : <Component {...props} />)} />
}

export default AdminRoute
