import React, {useContext, Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import AppContext from "../context/AppContext";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const Datepicker = () => {
    const appContext = useContext(AppContext);

    const newDay = (e) => {
        var date = new Date(e.target.value.replace(/-/g, "/"));
        var options = {day: '2-digit', month: 'short', year: 'numeric'};
        var resultDate = date.toLocaleDateString('en-US', options).replace(/,/g, "").replace(/ /g, "-");
        appContext.getList(resultDate)
    }
    const date = new Date().toLocaleDateString("en-US", 
                    {day: "2-digit", 
                    month: "2-digit", 
                    year: "numeric"
                    }).split("/");
    const defaultDate = date[2] + "-" + date[0] + "-" + date[1];

    return (
        <Fragment>
        <TextField 
            type="date" 
            className="date-label" 
            onChange={newDay}
            defaultValue={defaultDate} 
            // placeholder="Select"
            InputLabelProps={{
                shrink: true
            }}
        />
        {/* <CalendarTodayIcon className="calendar-icon"/> */}
        </Fragment>
    )
}

export default Datepicker
