import React, { useContext, useState } from 'react';
import AppContext from "../context/application/AppContext";
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
            {<label htmlFor="date-picker" className="date-picker">
                {date.toLocaleDateString("en-US", {day: '2-digit', month: '2-digit', year: '2-digit'}).replace(/\b0/g, "")}
            </label>}
            <div>
                <DatePicker
                    id={"date-picker"} 
                    selected={date}
                    onChange={newDay}
                    className={"browser-default"}
                    onFocus={(e) => e.target.blur()}
                /> 
                <CalendarTodayIcon/>
            </div>
        </div>
    )
}

export default Datepicker
