import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = ({ city }) => {
  const [message, setMessage] = useState('');

  const addToFavorites = (city) => {
    axios.post('/save-favorite', { cityName: city })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        setMessage('Failed to add city to favorites.');
      });
  };

  const removeFromFavorites = (city) => {
    axios.post('/remove-favorite', { cityName: city })
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        setMessage('Failed to remove city from favorites.');
      });
  };

  return (
    <div>
      <h3>{city}</h3>
      <button onClick={() => addToFavorites(city)}>Add to Favorites</button>
      <button onClick={() => removeFromFavorites(city)}>Remove from Favorites</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default WeatherComponent;
