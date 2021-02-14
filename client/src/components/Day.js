import React, {useContext} from 'react'
import AppContext from "../context/AppContext"

const Day = () => {
    const appContext = useContext(AppContext);
    const {date} = appContext;
    
    var dateString = date.replace(/-/g, " ")
    var dayOptions = { weekday: "long" }
    var dateOptions = { month: "long", day: "numeric", year: "numeric" }; 
    var day = new Date(dateString).toLocaleDateString("en-US", dayOptions);
    var fullDate = new Date(dateString).toLocaleDateString("en-US", dateOptions)
    
    return (
        <h1 className="date">{day} <br/> {fullDate}</h1>
    )
}

export default Day
