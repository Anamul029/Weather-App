import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [cities, setCities] = useState(() => {
    return JSON.parse(localStorage.getItem("cities")) || [];
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const addCity = () => {
    if (input && !cities.includes(input)) {
      setCities([...cities, input]);
      setInput("");
    }
  };

  const removeCity = (city) => {
    setCities(cities.filter((c) => c !== city));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded"
        />
        <button onClick={addCity} className="ml-2 bg-blue-500 text-white p-2 rounded">
          Add City
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {cities.map((city) => (
          <WeatherCard key={city} city={city} removeCity={removeCity} />
        ))}
      </div>
    </div>
  );
};

export default App;
