import React, { Fragment, useContext, useEffect } from "react"
import { Route } from "react-router-dom"

import Weather from "./heading/Weather"
import Day from "./heading/Day"
import Datepicker from "./heading/Datepicker"
import User from "./heading/User"
import PlannerNavigation from "./heading/PlannerNavigation"
import Daily from "./views/Daily"
import Month from "./views/Month"
import Alert from "../Alert"

import { getUser } from "../../utils/api/user"

import AuthContext from "../../context/authentication/AuthContext"

const Planner = props => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext)

  useEffect(() => {
    if (!user) getUser(dispatch)
  }, [user, dispatch])

  // style={{ overflowY: "auto", overflowX: "visible" }}

  return (
    <Fragment>
      <div className="position-div inside-cover">
        <div className="grid-div">
          <div className="page">
            <div className={`heading ${props.location.pathname.split("/")[2]}`}>
              <Day />
              <div className="widget">
                <Datepicker />
                <User />
                <Weather />
              </div>
              <PlannerNavigation {...props} />
            </div>
            <div className="pattern__wrapper">
              <Route path="/planner/day" component={Daily} />
              <Route path="/planner/month" component={Month} />
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
