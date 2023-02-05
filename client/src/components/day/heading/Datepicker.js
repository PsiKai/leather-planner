import React, { useContext, useEffect, useState } from "react"
import AppContext from "../../../context/application/AppContext"
import DateLabel from "../../layout/DateLabel"
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getFormattedDate, getPrintedDate, getShortFormDate } from "../../../utils/dates"
import { createList } from "../../../utils/api/list"
import "../../../styles/date-picker.css"

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
      <DatePicker
        id={"date-picker"}
        selected={date}
        onChange={newDay}
        aria-label="Select a new date"
        showPopperArrow={false}
        popperPlacement="bottom-end"
        todayButton={<button>Go To Today</button>}
        customInput={
          <DateLabel className="date-picker" currentValue={getPrintedDate(date)}>
            {getShortFormDate(date)}
            <TodayOutlinedIcon />
          </DateLabel>
        }
      />
    </div>
  )
}

export default Datepicker
