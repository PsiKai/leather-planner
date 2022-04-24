import React, { useContext } from "react"
import AppContext from "../../../context/application/AppContext"
import { getWeekday, getPrintedDate } from "../../../utils/dates"

const Day = () => {
  const {
    state: { list },
  } = useContext(AppContext)

  return (
    <h1 className="date">
      {getWeekday(list)} <span>{getPrintedDate(list)}</span>
    </h1>
  )
}

export default Day
