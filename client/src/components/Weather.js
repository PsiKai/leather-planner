import React, { useState, useEffect } from "react";
import axios from "axios";


const Weather = () => {
  // let apiKey = process.env.REACT_APP_WEATHER;

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState(null);

  const getLocation = async () => {
    const res = await axios.get("https://extreme-ip-lookup.com/json/");
    setLocation(res.data.city);
    // location && getWeather();
  };

  useEffect(() => {
    getWeather()
  }, [location])


  const getWeather = async () => {
    if (location !== null) {
      try {
        const res = await axios.post("/weather", {location});
        console.log(res);
        var suffix = res.data.weather.weather[0].icon.slice(2);
        setWeather(Math.round(res.data.weather.main.temp));
        setIcon(res.data.weather.weather[0].id + "-" + suffix);
      } catch (error) {
        console.log(error);
      } 
    }
    
  };

 useEffect(() => {
    getLocation();
    setInterval(() => {getLocation()}, 60000);
  //eslint-disable-next-line
  }, []);

  
  // const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  if (weather !== null) {
    return (
      <div className="weather">
        
        <h6 className="temp">
          {weather}°
        </h6>
        <i className={`weather-icon owf owf-${icon} owf-2x`}></i>
        {/* <img className="weather-icon" src={imgURL} alt="Weather Icon" /> */}
        
      </div>
    );
  }
  return (
    <div></div>
  )
};

export default Weather;

