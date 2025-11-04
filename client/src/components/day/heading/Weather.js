import React, { useState, useContext, useEffect } from "react"

import AuthContext from "../../../context/authentication/AuthContext"

import axios from "axios"

import CheckIcon from "@mui/icons-material/Check"
import SearchIcon from "@mui/icons-material/Search"
import CircularProgress from "@mui/material/CircularProgress"
import { setAlert } from "../../../utils/alert"

let weatherInterval

const Weather = () => {
  const [weather, setWeather] = useState(null)
  const [icon, setIcon] = useState("")
  const [location, setLocation] = useState("")
  const [weatherSearch, setWeatherSearch] = useState(false)
  const [loading, setLoading] = useState(false)

  const { dispatch } = useContext(AuthContext)

  useEffect(() => {
    var city = localStorage.getItem("city")
    city && setLocation(city)
    city && getWeather(city)
    return () => clearInterval(weatherInterval)
    //eslint-disable-next-line
  }, [])

  const newLocation = e => {
    setLocation(e.target.value.toLowerCase().replace(/ /g, "+"))
  }

  let submitCity = e => {
    e && e.preventDefault()
    if (location !== "" || location !== "/n") {
      localStorage.setItem("city", location)
      getWeather(location)
    }
  }

  const getWeather = async city => {
    weatherInterval && clearInterval(weatherInterval)
    setLoading(true)
    try {
      const res = await axios.post("/services/weather", { city })
      const {
        weather: [{ icon, id, description }],
        main: { temp },
      } = res.data.weather
      var suffix = icon.slice(2)
      setWeather({ temp: Math.round(temp), description })
      setIcon(id + "-" + suffix)
      setLoading(false)
      weatherInterval = setInterval(() => getWeather(city), 300000)
    } catch (error) {
      console.log(error)
      setAlert({ status: 500, msg: "There was an error getting the weather" }, dispatch)
      setLoading(false)
      localStorage.setItem("city", "")
      setLocation("")
    }
  }

  const resetWeatherSearch = () => {
    setWeather(null)
    clearInterval(weatherInterval)
    setWeatherSearch(true)
  }

  if (weather !== null) {
    return (
      <button
        className="weather change-city-button"
        onClick={resetWeatherSearch}
        aria-label={`Change location from ${location.replace(/\+/g, " ")}. The current weather is ${
          weather.description
        } and the temperature is ${weather.temp} degrees.`}
      >
        <h6 className="temp">{weather.temp}°</h6>
        <i className={`weather-icon owf owf-${icon} owf-2x`}></i>
      </button>
    )
  }

  if (loading) {
    return (
      <div className="weather">
        <CircularProgress onClick={() => setLoading(false)} />
      </div>
    )
  }

  return weatherSearch ? (
    <form className="weather-input__wrapper" onSubmit={submitCity}>
      <textarea
        className="weather-input"
        type="text"
        onChange={newLocation}
        placeholder="City"
        value={location.replace(/\+/g, " ")}
        onKeyDown={e => {
          e.code === "Enter" && submitCity()
        }}
        onClick={e => e.target.select()}
        rows="3"
        spellCheck="false"
        aria-label="Enter your city to get the weather"
        autoFocus
      ></textarea>
      <button type="submit">
        <CheckIcon />
      </button>
    </form>
  ) : (
    <button
      className="get-weather"
      onClick={resetWeatherSearch}
      aria-label="Get your local weather"
    >
      <span>Weather</span> <SearchIcon />
    </button>
  )
}

export default Weather
