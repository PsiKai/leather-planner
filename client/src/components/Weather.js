import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';


const Weather = () => {
  // let apiKey = process.env.REACT_APP_WEATHER;
  // const weatherSubmit = useRef()

  // useEffect(() => {
  //   var city = localStorage.getItem("city")
  //   city && setLocation(city)
  //   weatherSubmit.current.click();
  // }, [])

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");

  const newLocation = (e) => {
    setLocation(e.target.value)
  }

  const submitCity = (e) => {
    e.preventDefault();
    localStorage.setItem("city", location)
    getWeather();
    setInterval(() => {
      getWeather();
    }, 300000)
  }


  const getWeather = async () => {
    if (location !== "") {
      setLocation(location.toLowerCase().replace(/ /g, "+"))
      try {
        const res = await axios.post("/weather", {location});
        const data = res.data.weather
        var suffix = data.weather[0].icon.slice(2);
        setWeather(Math.round(data.main.temp));
        setIcon(data.weather[0].id + "-" + suffix);
      } catch (error) {
        console.log(error);
      } 
    }
    
  };

  if (weather !== null) {
    return (
      <div className="weather" onClick={() => setWeather(null)}>
        
        <h6 className="temp">
          {weather}°
        </h6>
        <i className={`weather-icon owf owf-${icon} owf-2x`}></i>
        
      </div>
    );
  }
  return (
    <form className="weather-input__wrapper" onSubmit={submitCity}>
      <input 
        className="weather-input" 
        type="text" 
        onChange={newLocation} 
        placeholder="Your town" 
        value={location}
        onFocus={(e) => e.target.select()}
      >
      </input>
      <button type="submit"><CheckIcon /></button>
    </form>
  )
};

export default Weather;

