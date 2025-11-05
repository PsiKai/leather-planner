import React, { Fragment, useContext, useEffect } from "react"
import { useLocation, Outlet } from "react-router-dom"

import Weather from "./heading/Weather"
import Day from "./heading/Day"
import Datepicker from "./heading/Datepicker"
import User from "./heading/User"
import PlannerNavigation from "./heading/PlannerNavigation"
import Alert from "../Alert"

import { getUser } from "../../utils/api/user"

import AuthContext from "../../context/authentication/AuthContext"

const Planner = props => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext)
  const location = useLocation()

  useEffect(() => {
    if (!user) getUser(dispatch)
  }, [user, dispatch])

  return (
    <Fragment>
      <div className="position-div inside-cover">
        <div className="grid-div">
          <div className="page">
            <div className={`heading ${location?.pathname.split("/")[2]}`}>
              <div className="heading-title">
                <PlannerNavigation {...props} />
                <Day />
              </div>
              <div className="widget">
                <Datepicker />
                <User />
                <Weather />
              </div>
            </div>
            <div className="pattern__wrapper">
              <Outlet />
            </div>
          </div>
        </div>
        <img
          className="binder-rings"
          src="../images/binder-rings.webp"
          alt="binder rings"
          aria-hidden="true"
        />
        <img
          className="binder-rings-two"
          src="../images/binder-rings.webp"
          alt="binder rings"
          aria-hidden="true"
        />
        <Alert />
      </div>
    </Fragment>
  )
}

export default Planner
