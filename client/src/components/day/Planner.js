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
  const { dispatch } = useContext(AuthContext)

  useEffect(() => getUser(dispatch), [dispatch])

  return (
    <Fragment>
      <div className="position-div inside-cover">
        <div className="grid-div">
          <div className="page">
            <div className={`heading ${props.location.pathname.split("/")[2]}`}>
              <div className="widget">
                <Datepicker />
                <User />
                <Weather />
              </div>
              <Day />
              <PlannerNavigation {...props} />
            </div>
            <div className="pattern__wrapper" style={{ overflowY: "auto", overflowX: "visible" }}>
              <Route path="/planner/day" component={Daily} />
              <Route path="/planner/month" component={Month} />
            </div>
          </div>
        </div>
        <img className="binder-rings" src="../images/binder-rings.webp" alt="binder rings" />
        <img className="binder-rings-two" src="../images/binder-rings.webp" alt="binder rings" />
        <Alert />
      </div>
    </Fragment>
  )
}

export default Planner
