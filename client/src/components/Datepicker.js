import React, { useContext, useRef, useState } from 'react';
import AppContext from "../context/AppContext";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

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
        <div className="date-label">
            <DatePicker 
                selected={date}
                onChange={newDay}
                className={"browser-default"}
                onFocus={(e) => e.target.blur()}
            /> 
            <CalendarTodayIcon/>
        </div>
    )
}

export default Datepicker
