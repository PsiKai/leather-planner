import React, {useContext, useRef} from 'react';
// import TextField from '@material-ui/core/TextField';
import AppContext from "../context/AppContext";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const Datepicker = () => {
    const appContext = useContext(AppContext);
    const calendar = useRef();

    const newDay = (e) => {
        if (e.target.value !== "") {
            var date = new Date(e.target.value.replace(/-/g, "/"));
            var options = {day: '2-digit', month: 'short', year: 'numeric'};
            var resultDate = date.toLocaleDateString('en-US', options).replace(/,/g, "").replace(/ /g, "-");
            appContext.getList(resultDate)
        }
    }
    const date = new Date().toLocaleDateString("en-US", 
                    {day: "2-digit", 
                    month: "2-digit", 
                    year: "numeric"
                    }).split("/");
    const defaultDate = date[2] + "-" + date[0] + "-" + date[1];

    return (
        <div className="date-label">
            <CalendarTodayIcon/>
            {/* <TextField 
                type="date"  
                onChange={newDay}
                defaultValue={defaultDate} 
                // placeholder="Select"
                InputLabelProps={{
                    shrink: true
                }}
            /> */}
            <input 
                ref={calendar}
                type="date" 
                onChange={newDay} 
                className="browser-default" 
                defaultValue={defaultDate}
            />
        </div>
    )
}

export default Datepicker
