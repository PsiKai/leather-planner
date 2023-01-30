import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import CalendarViewDayOutlinedIcon from "@material-ui/icons/CalendarViewDayOutlined"
import ViewDayOutlinedIcon from "@material-ui/icons/ViewDayOutlined"

const PlannerNavigation = props => {
  const [navSetting, setNavSetting] = useState()

  const renderNavIcons = useCallback(() => {
    switch (props.location.pathname) {
      case "/planner/day":
        return {
          component: <CalendarViewDayOutlinedIcon />,
          path: "month",
        }
      case "/planner/month":
        return {
          component: <ViewDayOutlinedIcon />,
          path: "day",
        }
      default:
        return
    }
  }, [props.location.pathname])

  useEffect(() => setNavSetting(renderNavIcons()), [props.location, renderNavIcons])

  return (
    <div className="planner-toggle__wrapper">
      <NavLink
        activeClassName="planner-toggle"
        to={`/planner/${navSetting?.path}`}
        aria-label="to explore entire month."
      >
        {navSetting?.component}
      </NavLink>
    </div>
  )
}

export default PlannerNavigation
