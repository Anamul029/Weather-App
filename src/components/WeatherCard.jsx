
import { useState, useEffect } from "react";
import axios from "axios";

const WeatherCard = ({ city, removeCity }) => {
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("C"); //  Default: Celsius
  const API_KEY = "fa5e2cbbbc163d0df96966bbc0b2e3fa"

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => setWeather(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [city, API_KEY]);

  // Temperature Conversion Function
  const convertTemp = (temp) => (unit === "C" ? temp : (temp * 9) / 5 + 32);

  return (
    <div className="border p-4 rounded-lg shadow-lg text-center bg-blue-50">
      {weather ? (
        <>
          <h2 className="text-xl font-bold">{weather.name}</h2>
          <p>Temperature: <span className="font-semibold">{convertTemp(weather.main.temp).toFixed(1)}°{unit}</span></p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>

          {/*  Toggle Button */}
          <button
            onClick={() => setUnit(unit === "C" ? "F" : "C")}
            className="bg-green-600 text-white px-3 py-1 rounded-md mx-2 mt-2"
          >
            Switch to {unit === "C" ? "Fahrenheit" : "Celsius"}
          </button>

          {/*  Remove City Button */}
          <button
            onClick={() => removeCity(city)}
            className="bg-red-500 text-white px-3 py-1 rounded-md mt-2"
          >
            Remove city
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherCard;
