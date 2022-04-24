import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Planner from "./components/day/Planner"
import Cover from "./components/cover/Cover"
import EditProfile from "./components/profile/EditProfile"
import UserAnalytics from "./components/admin/UserAnalytics"
import AppState from "./context/application/AppState"
import AuthState from "./context/authentication/AuthState"
import setAuthToken from "./utils/setAuthToken"
import PrivateRoute from "./components/routing/PrivateRoute"
import "./App.css"
import AdminRoute from "./components/routing/AdminRoute"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <AppState>
        <Router>
          <Switch>
            <PrivateRoute path="/planner" component={Planner} />
            <Route exact path="/" component={Cover} />
            <PrivateRoute exact path="/profile" component={EditProfile} />
            <AdminRoute exact path="/admin" component={UserAnalytics} />
          </Switch>
        </Router>
      </AppState>
    </AuthState>
  )
}

export default App
