
import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  // simultaneously multiple cities
  const defaultCities = ["Dhaka", "New York", "London", "Tokyo", "Sydney"];
  const [cities, setCities] = useState(() => {
    return JSON.parse(localStorage.getItem("cities")) || defaultCities;
  });

  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">Weather Information Dashborad</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search City..."
        className="border p-2 rounded w-60 mb-4"
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
      />

      {/*Add City Form */}
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

      {/* Multiple Weather Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {cities
          .filter((city) => city.toLowerCase().includes(searchTerm))
          .map((city) => (
            <WeatherCard key={city} city={city} removeCity={removeCity} />
          ))}
      </div>
    </div>
  );
};

export default App;
