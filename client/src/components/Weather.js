import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';


const Weather = () => {
  // let apiKey = process.env.REACT_APP_WEATHER;
  const weatherSubmit = useRef()

  useEffect(() => {
    var city = localStorage.getItem("city")
    city && setLocation(city)
    // console.log(weatherSubmit.current);
    weatherSubmit.current.click();
  }, [])

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");

  // const getLocation = async () => {
  //   const res = await axios.get("https://extreme-ip-lookup.com/json/");
  //   setLocation(res.data.city);
  // };

  const newLocation = (e) => {
    setLocation(e.target.value)
  }

  const submitCity = (e) => {
    e.preventDefault();
    localStorage.setItem("city", location)
    getWeather();
  }


  const getWeather = async () => {
    if (location !== "") {
      setLocation(location.toLowerCase().replace(/ /g, "+"))
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

//  useEffect(() => {
//     getLocation();
//     setInterval(() => {getLocation()}, 60000);
//   //eslint-disable-next-line
//   }, []);

  
  // const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  if (weather !== null) {
    return (
      <div className="weather" onClick={() => setWeather(null)}>
        
        <h6 className="temp">
          {weather}°
        </h6>
        <i className={`weather-icon owf owf-${icon} owf-2x`}></i>
        {/* <img className="weather-icon" src={imgURL} alt="Weather Icon" /> */}
        
      </div>
    );
  }
  return (
    <form className="weather-input__wrapper" onSubmit={submitCity}>
      <input 
        className="weather-input" 
        type="text" 
        onChange={newLocation} 
        placeholder="Your Town" 
        value={location}
        onFocus={(e) => e.target.select()}
      >
      </input>
      <button ref={weatherSubmit} type="submit" onClick={() => console.log("clicked")}><CheckIcon /></button>
    </form>
  )
};

export default Weather;

