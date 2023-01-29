import React, { useContext, useEffect, useState } from "react"
import AppContext from "../../../context/application/AppContext"
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import "../../../styles/date-picker.css"
import { getFormattedDate } from "../../../utils/dates"
import { createList } from "../../../utils/api/list"

const Datepicker = () => {
  const {
    state: { list },
    dispatch,
  } = useContext(AppContext)

  const [date, setDate] = useState(new Date(list.replace(/-/g, " ")))

  useEffect(() => setDate(new Date(list.replace(/-/g, " "))), [list])

  const newDay = async e => {
    setDate(e)
    const selectedDate = getFormattedDate(e)
    try {
      createList(selectedDate, dispatch)
    } catch (error) {
      setDate(new Date(list.replace(/-/g, " ")))
    }
  }

  return (
    <div className="date-label" aria-label="Select a new date">
      <label htmlFor="date-picker" className="date-picker">
        {date.toLocaleDateString("en-US", { day: "numeric", month: "numeric", year: "2-digit" })}
      </label>
      <TodayOutlinedIcon />
      <DatePicker
        id={"date-picker"}
        selected={date}
        onChange={newDay}
        className={"browser-default"}
        onFocus={e => e.target.blur()}
        aria-label="Select a new date"
        showPopperArrow={false}
        todayButton="Go To Today"
      />
    </div>
  )
}

export default Datepicker
