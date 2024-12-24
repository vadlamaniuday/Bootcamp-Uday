import { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error(error);
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        Weather App (Vite+React)
      </h1>
      <SearchBar onSearch={fetchWeather} />

      {loading && <div className="text-white mt-8">Loading...</div>}

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {weather && !loading && !error && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;
