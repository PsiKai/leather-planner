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
          label: "to monthly planner",
        }
      case "/planner/month":
        return {
          component: <ViewDayOutlinedIcon />,
          path: "day",
          label: "to daily planner",
        }
      default:
        return
    }
  }, [props.location.pathname])

  useEffect(() => setNavSetting(renderNavIcons()), [props.location, renderNavIcons])

  return (
    <NavLink
      activeClassName="planner-toggle"
      className="planner-toggle__wrapper"
      to={`/planner/${navSetting?.path}`}
      aria-label={navSetting?.label}
    >
      {navSetting?.component}
    </NavLink>
  )
}

export default PlannerNavigation
