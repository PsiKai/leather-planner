import React, { useState } from "react";
import axios from "axios";
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';

let interval

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
  const [notCleared, setNotCleared] = useState(false)
  const [weatherLabel, setWeatherLabel] = useState(false)

  const newLocation = (e) => {
    setLocation(e.target.value)
  }

  let submitCity = (e) => {
    e.preventDefault();
    notCleared && clearInterval(interval)
    localStorage.setItem("city", location)
    getWeather();
    interval = setInterval(getWeather, 300000)
  }


  const getWeather = async () => {
    setNotCleared(true)
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
    weatherLabel ?
      <form className="weather-input__wrapper" onSubmit={submitCity}>
        <input
          className="weather-input"
          type="text"
          onChange={newLocation}
          placeholder="City"
          value={location}
          onFocus={(e) => e.target.select()}
          autoFocus
        >
        </input>
        <button type="submit"><CheckIcon /></button>
      </form>
      :
      <button className="get-weather" onClick={() => setWeatherLabel(true)}>Weather <SearchIcon /></button>
    
    
  )
};

export default Weather;
