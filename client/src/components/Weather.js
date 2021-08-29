import React, { useState, useContext, useEffect } from "react";
import AppContext from "../context/AppContext"
import AuthContext from "../context/AuthContext"
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from "lodash"

let interval

const Weather = () => {
  const appContext = useContext(AppContext)
  const {loading, setLoading} = appContext

  const authContext = useContext(AuthContext)
  const {setAlert} = authContext

  useEffect(() => {
    var city = localStorage.getItem("city")
    city && setLocation(city)
    // city && submitCity();
  }, [])

  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState("");
  const [location, setLocation] = useState("");
  const [notCleared, setNotCleared] = useState(false)
  const [weatherLabel, setWeatherLabel] = useState(false)

  const newLocation = (e) => {
    setLocation(e.target.value)
  }

  let submitCity = (e) => {
    e && e.preventDefault();
    notCleared && clearInterval(interval)
    localStorage.setItem("city", location)
    getWeather();
    interval = setInterval(getWeather, 300000)
  }


  const getWeather = async () => {
    setNotCleared(true)
    setLoading(true)
    if (location !== "") {
      setLocation(location.toLowerCase().replace(/ /g, "+")) 
      try {
        const res = await axios.post("/weather", {location});
        const data = res.data.weather
        var suffix = data.weather[0].icon.slice(2);
        setWeather(Math.round(data.main.temp));
        setIcon(data.weather[0].id + "-" + suffix);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setAlert("There was an error getting the weather")
        setLoading(false)
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

  if (loading) {
    return (
      <div className="weather">
        <CircularProgress 
          style={{width: "30px", height: "30px", color: "black", margin: "4px"}} 
          onClick={() => setLoading(false)}/>
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
          // onFocus={(e) => e.target.select()}
          autoFocus
          onKeyDown={(e) => {e.code === "Enter" && submitCity()}}
          rows="3"
          spellCheck="false"
        >
        </textarea>
        <button type="submit"><CheckIcon /></button>
      </form>
      :
      <button className="get-weather" onClick={() => setWeatherLabel(true)}>Weather <SearchIcon /></button>  
  )
};

export default Weather;
