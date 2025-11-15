import React from "react"
import { NavLink } from "react-router-dom"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"

const PlannerNavigation = () => {
  return (
    <nav className="planner-toggle__wrapper">
      <NavLink
        className={({ isActive }) => `${isActive ? "active-planner-toggle" : ""}`}
        to="/planner/day"
        aria-label={"Daily Planner"}
      >
        <CalendarTodayIcon />
      </NavLink>
      <NavLink
        className={({ isActive }) => `${isActive ? "active-planner-toggle" : ""}`}
        to="/planner/month"
        aria-label={"Monthly Planner"}
      >
        <CalendarMonthIcon />
      </NavLink>
    </nav>
  )
}

export default PlannerNavigation
