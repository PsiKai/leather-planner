import React, { useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import { getWeekday, getPrintedDate } from "../../../utils/dates"

const Day = () => {
  const {
    state: { list },
  } = useContext(AppContext)

  return (
    <h1 className="date">
      {getWeekday(list.replace(/-/g, " "))} <span>{getPrintedDate(list.replace(/-/g, " "))}</span>
    </h1>
  )
}

export default Day
