import React, { useContext, useRef, useState } from 'react';
// import TextField from '@material-ui/core/TextField';
import AppContext from "../context/AppContext";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {
    const appContext = useContext(AppContext);
    const calendar = useRef();
    const [date, setDate] = useState(new Date())

    const newDay = (e) => {
        console.log(e.toLocaleDateString());
        setDate(e)
        // const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
        
        // const validated = regexDate.test(e.toLocaleDateString())
        // console.log(validated);
        // if (validated) {
        //     var date = new Date(e.target.value.replace(/-/g, "/"));
            var options = {day: '2-digit', month: 'short', year: 'numeric'};
            var resultDate = e.toLocaleDateString('en-US', options).replace(/,/g, "").replace(/ /g, "-");
            console.log(resultDate);
            appContext.getList(resultDate)
        // }
    }
    // const date = new Date().toLocaleDateString("en-US", 
    //                 {day: "2-digit", 
    //                 month: "2-digit", 
    //                 year: "numeric"
    //                 }).split("/");
    // const defaultDate = date[2] + "/" + date[0] + "/" + date[1];

    return (
        <div className="date-label">
            <DatePicker 
                selected={date}
                onChange={newDay}
                className={"browser-default"}
            /> 
            <CalendarTodayIcon/>
        </div>
    )
}

export default Datepicker
