import { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ city, removeCity }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
  // const API_KEY ="fa5e2cbbbc163d0df96966bbc0b2e3fa"
  console.log('Api key=',API_KEY);
  
  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [city, API_KEY]);

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      {weather ? (
        <>
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <button onClick={() => removeCity(city)} className="bg-red-500 text-white p-1 rounded">
            Remove
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
