
import { GoSearch } from "react-icons/go";
import { FiMapPin } from "react-icons/fi";
import { LuWind } from "react-icons/lu";
import './index.css';
import './App.css';
import getWeather from "./api/api";
import { useState } from 'react';
import { format } from 'date-fns';

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeatherbyCity = async () => {
    try {
      const weatherData = await getWeather(city);
      setWeather(weatherData);
      setError("");
    } catch (err) {
      setWeather(null);
      setError("City not found or an error occurred.");
    }
    setCity("");
  };

  const renderDate = () => {
    let now = new Date();
    return format(now, "EEEE, MMMM do, h:mm a");
  };

  return (
    <div className="app hover:shadow-green-300">
      <h1 className="font-bold hover:text-gray-300">Weather App</h1>
      <div className="input-wrapper">
        <input 
          type="text" 
          placeholder="Enter City Name" 
          className="mt-3 text-black" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
        />
        <button className="ml-0 mt-2" onClick={getWeatherbyCity}>
          <GoSearch size={30} className="" />
        </button>
      </div>

      {weather && (
        <div className="content">
          <div className="location d-flex gap-1">
            <FiMapPin />
            <h1>{weather.name} <span>({weather.sys.country})</span></h1>
          </div>
          <p className="datetext my-2">{renderDate()}</p>
          <div className="weatherdesc d-flex flex-c">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
            <h3 className="text-2xl">{weather.weather[0].description}</h3>
          </div>
          <div className="tempstats d-flex flex-c">
            <h1>{weather.main.temp}<span>&deg;C</span></h1>
            <h3>Feels like {weather.main.feels_like}<span>&deg;C</span></h3>
          </div>
          <div className="windstats d-flex gap-2">
            <LuWind />
            <h3 className="my-3">Wind is {weather.wind.speed} m/s at {weather.wind.deg}&deg;c</h3>
          </div>
        </div>
      )}

      {error && (
        <div className="content">
          <h4>{error}</h4>
        </div>
      )}
    </div>
  );
}

export default App;
