import React from 'react';
import WeatherComponent from '../WeatherComponent';

const WeatherPage = () => {
  const city = "New York";  // Replace with dynamic city based on API response

  return (
    <div>
      <h2>Weather Forecast</h2>
      {/* Other weather details go here */}

      {/* Add the WeatherComponent */}
      <WeatherComponent city={city} />
    </div>
  );
};

export default WeatherPage;
