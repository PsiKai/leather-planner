import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
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
import Daily from "./components/day/views/Daily"
import Month from "./components/day/views/Month"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  return (
    <AuthState>
      <AppState>
        <Router>
          <Routes>
            <Route path="/" exact element={<Cover />} />
            <Route element={<PrivateRoute />}>
              <Route path="/planner" element={<Planner />}>
                <Route path="/planner/day" element={<Daily />} />
                <Route path="/planner/month" element={<Month />} />
              </Route>
            </Route>
            <Route component={<PrivateRoute />}>
              <Route path="/profile" exact element={<EditProfile />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" exact element={<UserAnalytics />} />
            </Route>
          </Routes>
        </Router>
      </AppState>
    </AuthState>
  )
}

export default App
