import React, {useContext, useRef} from 'react';
// import TextField from '@material-ui/core/TextField';
import AppContext from "../context/AppContext";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const Datepicker = () => {
    const appContext = useContext(AppContext);
    const calendar = useRef();

    const newDay = (e) => {
        const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;const validated = regexDate.test(e.target.value)
        console.log(validated);
        if (validated) {
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
                placeholder="yyyy-mm-dd"
            />
        </div>
    )
}

export default Datepicker
