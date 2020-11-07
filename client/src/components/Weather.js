import React, { useState, useEffect } from "react";
import axios from "axios";

let apiKey = process.env.REACT_APP_WEATHER;

const Weather = () => {
  const [weather, setWeather] = useState("");
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");

  const getLocation = async () => {
    const res = await axios.get("https://extreme-ip-lookup.com/json/");
    setLocation(res.data.city);
    location && getWeather();
  };

  const getWeather = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`
      );
      var suffix = res.data.weather[0].icon.slice(2);
      setWeather(Math.round(res.data.main.temp));
      setIcon(res.data.weather[0].id + "-" + suffix);
    };

 useEffect(() => {
    getLocation();
    setInterval(() => {getLocation()}, 60000);
  //eslint-disable-next-line
  }, [location]);

  // const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  if (weather !== null) {
    return (
      <div className="weather">
        <h2 className="temp">
          {weather}°
        </h2>
        <i className={`weather-icon owf owf-${icon} owf-3x`}></i>
        {/* <img className="weather-icon" src={imgURL} alt="Weather Icon" /> */}
      </div>
    );
  }
};

export default Weather;

