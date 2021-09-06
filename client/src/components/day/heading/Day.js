import React, {useContext, useEffect} from 'react'
import AppContext from "../../../context/application/AppContext"
import pageFlip from "../../../sounds/page-flip.wav"

const Day = () => {

    const appContext = useContext(AppContext);
    const {date} = appContext;

    useEffect(() => {
        
        var audio = new Audio(pageFlip);
        audio.volume = 0.1;
        audio.play();
    }, [date])
    
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
