import { useEffect, useState } from "react"
import axios from "axios"

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}&aqi=no`
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [capital, apiKey])

  if (!weather) return <p>Loading weather data...</p>
  console.log(weather)

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.current.temp_c} °C</p>
      <p>Weather: {weather.current.condition.text}</p>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
    </div>
  )
}

export default Weather
