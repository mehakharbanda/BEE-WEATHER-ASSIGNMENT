import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import WeatherComponent from "./WeatherComponent"; // Import the WeatherComponent
import "./App.css";

function App() {
  const [city, setCity] = useState(""); // State to manage the selected city

  // You can update the city based on user actions or API response
  const handleCityChange = (newCity) => {
    setCity(newCity);
  };

  return (
    <React.Fragment>
      <div className="container">
        {/* Display weather based on current location */}
        <CurrentLocation onCityChange={handleCityChange} />

        {/* Display the WeatherComponent with the selected city */}
        {city && (
          <div className="favorite-section">
            <WeatherComponent city={city} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default App;
