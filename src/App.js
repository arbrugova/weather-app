// Importing necessary module from React
import { useState } from "react";
// Importing the styles from the external CSS file
import "./App.css";

// API configuration for OpenWeatherMap
const api = {
  key: "3335a5d04df81c65cf0eac7d6f65f773",
  base: "https://api.openweathermap.org/data/2.5",
};

// Main functional component named App
function App() {
  // State hooks to manage the query and weather data
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  // Get current time (hours only) for day/night mode
  const currentTime = new Date().getHours();

  // Array containing days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Function to handle search when 'Enter' key is pressed
  const search = (evt) => {
    if (evt.key === "Enter") {
      // Fetch weather data from OpenWeatherMap API
      fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          // Update the weather state and reset the query input
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  // Function to format the date using current date object
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  // Function to format time in 12-hour AM/PM format
  const formatTime = (hours) => {
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${new Date().getMinutes()} ${ampm}`;
  };

  // JSX code defining the structure of the component
  return (
    <div className={currentTime < 12 ? "app" : "app night"}>
      <main>
        <div className="search-box">
          {/* Input for searching with event handlers */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          {/* Display current time and date */}
          <div className="time">
            <h1>{formatTime(currentTime)}</h1>
            <p>{dateBuilder(new Date())}</p>
          </div>
        </div>
        {/* Conditional rendering based on weather data */}
        {typeof weather.main !== "undefined" ? (
          <div>
            {/* Location information */}
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              {/* Date information */}
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            {/* Weather information */}
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          // Placeholder for when weather data is not available
          ""
        )}
      </main>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
