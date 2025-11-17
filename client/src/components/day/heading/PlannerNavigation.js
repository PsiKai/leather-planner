import React from "react"
import { NavLink } from "react-router-dom"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import TodayIcon from "@mui/icons-material/Today"

const PlannerNavigation = () => {
  return (
    <nav className="planner-toggle__wrapper">
      <NavLink
        className={({ isActive }) => `${isActive ? "active-planner-toggle" : ""}`}
        to="/planner/day"
        aria-label={"Daily Planner"}
      >
        <TodayIcon />
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
