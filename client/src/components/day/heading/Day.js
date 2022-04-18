import React, { useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import { getWeekday, getPrintedDate } from "../../../utils/dates"

const Day = () => {
  const { date } = useContext(AppContext)

  return (
    <h1 className="date">
      {getWeekday(date)} <span>{getPrintedDate(date)}</span>
    </h1>
  )
}

export default Day
