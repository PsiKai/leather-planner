import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import AuthContext from "../../context/authentication/AuthContext"
import { getUser } from "../../utils/api/user"

import AnalyticsState from "../../context/analytics/AnalyticsState"
import Alert from "../Alert"
import UserData from "./UserData"

import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"

import "../../styles/admin.css"

const UserAnalytics = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext)

  useEffect(() => {
    if (!user) getUser(dispatch)
  }, [user, dispatch])

  return (
    <AnalyticsState>
      <div className="position-div inside-cover">
        <div className="grid-div">
          <div className="page">
            <div className="heading">
              <Link to="/profile" className="profile-nav">
                <ArrowBackIosIcon />
                Back
              </Link>
              <h1 className="profile-heading">
                User Data
                <SupervisorAccountIcon />
              </h1>
            </div>
            <UserData />
          </div>
        </div>
        <img className="binder-rings" src="./images/binder-rings.webp" alt="binder rings" />
        <img className="binder-rings-two" src="./images/binder-rings.webp" alt="binder rings" />
        <Alert />
      </div>
    </AnalyticsState>
  )
}

export default UserAnalytics
