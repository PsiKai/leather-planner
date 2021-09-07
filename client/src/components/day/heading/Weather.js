import React, { useState, useContext, useEffect } from "react";

import AuthContext from "../../../context/authentication/AuthContext"

import axios from "axios";

import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

let weatherInterval

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("")
  const [weatherSearch, setWeatherSearch] = useState(false)
  const [loading, setLoading] = useState(false)

  const authContext = useContext(AuthContext)
  const {setAlert} = authContext

  useEffect(() => {
    var city = localStorage.getItem("city")
    city && setLocation(city)
    city && getWeather(city);
    return () => clearInterval(weatherInterval)
    //eslint-disable-next-line
  }, [])


  const newLocation = (e) => {
    setLocation(e.target.value.toLowerCase().replace(/ /g, "+"))
  }

  let submitCity = (e) => {
    e && e.preventDefault()
    if (location !== "" || location !== "/n") {
      localStorage.setItem("city", location)
      getWeather(location)
    }    
  }


  const getWeather = async (city) => {
    weatherInterval && clearInterval(weatherInterval)
    setLoading(true)
    try {
      const res = await axios.post("/services/weather", {city})
      const { weather: [ { icon, id } ], main: { temp } } = res.data.weather
      var suffix = icon.slice(2);
      setWeather(Math.round(temp));
      setIcon(id + "-" + suffix);
      setLoading(false)
      weatherInterval = setInterval(() => getWeather(city), 300000)
    } catch (error) {
      console.log(error);
      setAlert({ status: 500, msg: "There was an error getting the weather" })
      setLoading(false)
      localStorage.setItem("city", "")
      setLocation("")
    }
  };

  const resetWeatherSearch = () => {
    setWeather(null)
    clearInterval(weatherInterval)
    setWeatherSearch(true)
  }

  if (weather !== null) {
    return (
      <div className="weather" onClick={resetWeatherSearch}>
        <h6 className="temp">{weather}°</h6>
        <i className={`weather-icon owf owf-${icon} owf-2x`}></i>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="weather">
        <CircularProgress onClick={() => setLoading(false)}/>
      </div>
    )
  }

  return (
    weatherSearch ?
      <form className="weather-input__wrapper" onSubmit={submitCity}>
        <textarea
          className="weather-input"
          type="text"
          onChange={newLocation}
          placeholder="City"
          value={location.replace(/\+/g, " ")}
          onKeyDown={(e) => {e.code === "Enter" && submitCity()}}
          rows="3"
          spellCheck="false"
        ></textarea>
        <button type="submit"><CheckIcon /></button>
      </form>
      :
      <button className="get-weather" onClick={resetWeatherSearch}>
        <span>Weather</span> <SearchIcon />
      </button>  
  )
};

export default Weather;
