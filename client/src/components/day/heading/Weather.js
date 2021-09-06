import React, { useState, useContext, useEffect } from "react";
import AppContext from "../../../context/application/AppContext"
import AuthContext from "../../../context/authentication/AuthContext"
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';

let interval

const Weather = () => {
  const appContext = useContext(AppContext)
  const {loading, setLoading} = appContext

  const authContext = useContext(AuthContext)
  const {setAlert} = authContext

  useEffect(() => {
    var city = localStorage.getItem("city")
    city && setLocation(city)
    city && getWeather(city);
    return () => clearInterval(interval)
    //eslint-disable-next-line
  }, [])

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("")
  const [weatherLabel, setWeatherLabel] = useState(false)

  const newLocation = (e) => {
    setLocation(e.target.value.toLowerCase().replace(/ /g, "+"))
  }

  let submitCity = (e) => {
    e && e.preventDefault()
    localStorage.setItem("city", location)
    getWeather(location)
  }


  const getWeather = async (city) => {
    interval && clearInterval(interval)
    interval = setInterval(() => getWeather(city), 300000)
    setLoading(true)
    try {
      const res = await axios.post("/services/weather", {city})
      const data = res.data.weather
      var suffix = data.weather[0].icon.slice(2);
      setWeather(Math.round(data.main.temp));
      setIcon(data.weather[0].id + "-" + suffix);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setAlert({ status: 500, msg: "There was an error getting the weather" })
      setLoading(false)
    }
  };

  const resetWeatherSearch = () => {
    setWeather(null)
    clearInterval(interval)
    setWeatherLabel(true)
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
    weatherLabel ?
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
