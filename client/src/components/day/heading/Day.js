import React, { useContext, useEffect } from "react"
import AppContext from "../../../context/application/AppContext"
import playAudio from "../../../utils/playAudio"
import { getWeekday, getPrintedDate } from "../../../utils/dates"

const Day = () => {
  const { date } = useContext(AppContext)

  useEffect(() => playAudio("page"), [date])

  return (
    <h1 className="date">
      {getWeekday(date)} <br /> {getPrintedDate(date)}
    </h1>
  )
}

export default Day
