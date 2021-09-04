const express = require("express")
const router = express.Router()
const axios = require('axios')

if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config()
  }

router.post("/", async (req, res) => {
    const apiKey = process.env.WEATHER_API
    const location = req.body.location.toLowerCase()
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=` + location + `&appid=` + apiKey + `&units=imperial`
      );
      res.status(response.data.cod).json({ weather: response.data })
    } catch (err) {
      res.send(err)
    }
})

module.exports = router
