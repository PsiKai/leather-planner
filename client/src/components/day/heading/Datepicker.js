import React, { useContext, useState } from 'react';
import AppContext from "../../../context/application/AppContext";
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/date-picker.css"

const Datepicker = () => {
    const appContext = useContext(AppContext);
    const [date, setDate] = useState(new Date())

    const newDay = (e) => {
        setDate(e)
        var options = {day: '2-digit', month: 'short', year: 'numeric'};
        var resultDate = e.toLocaleDateString('en-US', options).replace(/,/g, "").replace(/ /g, "-");
        appContext.getList(resultDate)
    }

    return (
        <div className="date-label" aria-label="Select a new date">
            <label htmlFor="date-picker" className="date-picker">
                {date.toLocaleDateString("en-US", {day: 'numeric', month: 'numeric', year: '2-digit'})}
            </label>
            <TodayOutlinedIcon/>
            <DatePicker
                id={"date-picker"}
                selected={date}
                onChange={newDay}
                className={"browser-default"}
                onFocus={(e) => e.target.blur()}
                aria-label="Select a new date"
                showPopperArrow={false}
                todayButton="Go To Today"
            />
        </div>
    )
}

export default Datepicker
