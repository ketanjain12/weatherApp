
import { GoSearch } from "react-icons/go";
import { FiMapPin } from "react-icons/fi";
import { LuWind } from "react-icons/lu";
import './index.css';
import './App.css';
import getWeather from "./api/api";
import { useState } from 'react';
import { format } from 'date-fns';

// // function App() {

//   // const [city, setCity] = useState("");
//   // const [weather, setWeather] = useState(null);
//   // const [error, setError] = useState("");

//   // const getWeatherbyCity = async () => {
//   //   try {
//   //     const weatherData = await getWeather(city);
//   //     setWeather(weatherData);
//   //     setError("");
//   //   } catch (err) {
//   //     setWeather(null);
//   //     setError("City not found or enter encorrect city name .");
//   //   }
//   //   setCity("");
//   // };

//   // const renderDate = () => {
//   //   let now = new Date();
//   //   return format(now, "EEEE, MMMM do, h:mm a");
//   // };

//   // return (
//   //   <div className="app hover:shadow-green-300">
//   //     <h1 className="font-bold hover:text-gray-300">Weather App</h1>
//   //     <div className="input-wrapper">
//   //       <input 
//   //         type="text" 
//   //         placeholder="Enter City Name" 
//   //         className="mt-3 text-black" 
//   //         value={city} 
//   //         onChange={(e) => setCity(e.target.value)} 
//   //       />
//   //       <button className="ml-0 mt-2" onClick={getWeatherbyCity}>
//   //         <GoSearch size={30} className="" />
//   //       </button>
//   //     </div>
//   //     <div>
//   //       <button>on</button>
//   //       </div>
//   // add here aug12 logic
//   function App() {
//     const [city, setCity] = useState('');
//     const [weather, setWeather] = useState(null);
//     const [error, setError] = useState('');
  
//     const getWeatherbyCity = async () => {
//       try {
//         const weatherData = await getWeather(city); // Assuming getWeather is a function to fetch weather data
//         setWeather(weatherData);
//         setError('');
//       } catch (err) {
//         setWeather(null);
//         setError('City not found / entered incorrect city name.');
//       }
//       setCity('');
//     };
  
//     const handleKeyDown = (event) => {
//       if (event.key === 'Enter') {
//         getWeatherbyCity();
//       }
//     };
    
  
//     const renderDate = () => {
//       let now = new Date();
//       return format(now, 'EEEE, MMMM do, h:mm a');
//     };
  
//     return (
    
//       <div className="app hover:shadow-green-300">
//         <h1 className="font-bold hover:text-gray-300">Weather App</h1>
//         <div className="input-wrapper">
//           <input
//             type="text"
//             placeholder="Enter City Name"
//             className="mt-3 text-black"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             onKeyDown={handleKeyDown} // Added event listener for Enter key
//           />
//           <button className="ml-0 mt-2" onClick={getWeatherbyCity}>
//             <GoSearch size={30} />
//           </button>
//         </div>
  
//         {weather && (
//           <div className="content">
//             <div className="location d-flex gap-1">
//               <FiMapPin />
//               <h1>
//                 {weather.name} <span>({weather.sys.country})</span>
//               </h1>
//             </div>
//             <p className="datetext my-2">{renderDate()}</p>
//             <div className="weatherdesc d-flex flex-c">
//               <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
//               <h3 className="text-2xl">{weather.weather[0].description}</h3>
//             </div>
//             <div className="tempstats d-flex flex-c">
//               <h1>
//                 {weather.main.temp}
//                 <span>&deg;C</span>
//               </h1>
//               <h3>
//                 Feels like {weather.main.feels_like}
//                 <span>&deg;C</span>
//               </h3>
//             </div>
//             <div className="windstats d-flex gap-2">
//               <LuWind />
//               <h3 className="my-3">
//                 Wind is {weather.wind.speed} m/s at {weather.wind.deg}&deg;
//               </h3>
//             </div>
//           </div>
//         )}
  
//         {error && (
//           <div className="content">
//             <h4>{error}</h4>
//           </div>
//         )}
//       </div>
//     );
//   }
//   export default App;
{/* <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" /> */}

// new data aug12


function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]); // State for storing suggestions

  const getWeatherbyCity = async () => {
    try {
      const weatherData = await getWeather(city); // Assuming getWeather is a function to fetch weather data
      setWeather(weatherData);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found or entered incorrect city name.');
    }
    setCity('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      getWeatherbyCity();
    }
  };

  const handleInputChange = async (e) => {
    const userInput = e.target.value;
    setCity(userInput);

    if (userInput.length > 2) {
      try {
        const suggestionData = await fetchCitySuggestions(userInput); // Assuming fetchCitySuggestions is a function to fetch city suggestions
        setSuggestions(suggestionData);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    getWeatherbyCity();    // Automatically fetch weather when a suggestion is clicked
  };

  const renderDate = () => {
    let now = new Date();
    return format(now, 'EEEE, MMMM do, h:mm a');
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Event listener for Enter key
        />
        <button className="ml-0 mt-2" onClick={getWeatherbyCity}>
          <GoSearch size={30} />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {weather && (
        <div className="content">
          <div className="location d-flex gap-1">
            <FiMapPin />
            <h1>
              {weather.name} <span>({weather.sys.country})</span>
            </h1>
          </div>
          <p className="datetext my-2">{renderDate()}</p>
          <div className="weatherdesc d-flex flex-c">
            <h3 className="text-2xl">{weather.weather[0].description}</h3>
          </div>
          <div className="tempstats d-flex flex-c">
            <h1>
              {weather.main.temp}
              <span>&deg;C</span>
            </h1>
            <h3>
              Feels like {weather.main.feels_like}
              <span>&deg;C</span>
            </h3>
          </div>
          <div className="windstats d-flex gap-2">
            <LuWind />
            <h3 className="my-3">
              Wind is {weather.wind.speed} m/s at {weather.wind.deg}&deg;
            </h3>
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
