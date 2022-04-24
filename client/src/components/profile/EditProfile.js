import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../../context/authentication/AuthContext"

import Alert from "../Alert"
import PasswordField from "./PasswordField"
import EditInfo from "./EditInfo"

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos"
import PersonIcon from "@material-ui/icons/Person"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"

import playAudio from "../../utils/playAudio"
import { getUser } from "../../utils/api/user"

const EditProfile = () => {
  const { dispatch, isAdmin } = useContext(AuthContext)

  useEffect(() => {
    getUser(dispatch)
    playAudio("page")
  }, [dispatch])

  return (
    <div className="position-div inside-cover">
      <div className="grid-div">
        <div className="page">
          <div className="heading">
            <Link className="profile-nav" to="/planner/day">
              <ArrowBackIosIcon />
              Back
            </Link>
            {isAdmin && (
              <Link className="profile-nav admin" to="/admin">
                Admin
                <SupervisorAccountIcon />
              </Link>
            )}
            <h1 className="profile-heading">
              Profile Settings
              <PersonIcon />
            </h1>
          </div>
          <div className="pattern__wrapper" style={{ overflowY: "auto", overflowX: "visible" }}>
            <div className="pattern">
              <img src="./images/Bald-Eagle.webp" className="watermark" alt="watermark" />
              <div className="content">
                <EditInfo />
                <PasswordField />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="binder-rings" src="./images/binder-rings.webp" alt="binder rings" />
      <img className="binder-rings-two" src="./images/binder-rings.webp" alt="binder rings" />
      <Alert />
    </div>
  )
}

export default EditProfile
