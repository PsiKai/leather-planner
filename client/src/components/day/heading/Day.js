import React, { useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import { getWeekday, getPrintedDate } from "../../../utils/dates"

const Day = () => {
  const {
    state: { list },
  } = useContext(AppContext)

  return (
    <h1 className="date">
      <span className="weekday">{getWeekday(list.replace(/-/g, " "))}</span>
      <span className="date-string">{getPrintedDate(list.replace(/-/g, " "))}</span>
    </h1>
  )
}

export default Day
