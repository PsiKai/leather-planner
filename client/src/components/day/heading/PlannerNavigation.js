import React, { useCallback, useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import CalendarViewDayOutlinedIcon from "@mui/icons-material/CalendarViewDayOutlined"
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined"

const PlannerNavigation = props => {
  const [navSetting, setNavSetting] = useState()
  const location = useLocation()

  const renderNavIcons = useCallback(() => {
    switch (location.pathname) {
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
  }, [location.pathname])

  useEffect(() => {
    setNavSetting(renderNavIcons())
  }, [props.location, renderNavIcons])

  return (
    <NavLink
      className={({ active }) => `${active ? "planner-toggle" : ""} planner-toggle__wrapper`}
      to={`/planner/${navSetting?.path}`}
      aria-label={navSetting?.label}
    >
      {navSetting?.component}
    </NavLink>
  )
}

export default PlannerNavigation
