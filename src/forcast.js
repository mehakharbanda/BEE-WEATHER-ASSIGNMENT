// import React, { useState, useEffect, Component } from "react";
// import axios from "axios";
// import apiKeys from "./apiKeys";
// import ReactAnimatedWeather from "react-animated-weather";

// function Forcast(props) {
//   const [query, setQuery] = useState("");
//   const [error, setError] = useState("");
//   const [weather, setWeather] = useState({});

//   const search = (city) => {
//     axios
//       .get(
//         `${apiKeys.base}weather?q=${
//           city != "[object Object]" ? city : query
//         }&units=metric&APPID=${apiKeys.key}`
//       )
//       .then((response) => {
//         setWeather(response.data);
//         setQuery("");
//       })
//       .catch(function (error) {
//         console.log(error);
//         setWeather("");
//         setQuery("");
//         setError({ message: "Not Found", query: query });
//       });
//   };
//   function checkTime(i) {
//     if (i < 10) {
//       i = "0" + i;
//     } // add zero in front of numbers < 10
//     return i;
//   }

//   const defaults = {
//     color: "white",
//     size: 112,
//     animate: true,
//   };

//   useEffect(() => {
//     search("Delhi");
//   }, []);

//   return (
//     <div className="forecast">
//       <div className="forecast-icon">
//         <ReactAnimatedWeather
//           icon={props.icon}
//           color={defaults.color}
//           size={defaults.size}
//           animate={defaults.animate}
//         />
//       </div>
//       <div className="today-weather">
//         <h3>{props.weather}</h3>
//         <div className="search-box">
//           <input
//             type="text"
//             className="search-bar"
//             placeholder="Search any city"
//             onChange={(e) => setQuery(e.target.value)}
//             value={query}
//           />
//           <div className="img-box">
//             {" "}
//             <img
//               src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
//               onClick={search}
//             />
//           </div>
//         </div>
//         <ul>
//           {typeof weather.main != "undefined" ? (
//             <div>
//               {" "}
//               <li className="cityHead">
//                 <p>
//                   {weather.name}, {weather.sys.country}
//                 </p>
//                 <img
//                   className="temp"
//                   src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
//                 />
//               </li>
//               <li>
//                 Temperature{" "}
//                 <span className="temp">
//                   {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
//                 </span>
//               </li>
//               <li>
//                 Humidity{" "}
//                 <span className="temp">
//                   {Math.round(weather.main.humidity)}%
//                 </span>
//               </li>
//               <li>
//                 Visibility{" "}
//                 <span className="temp">
//                   {Math.round(weather.visibility)} mi
//                 </span>
//               </li>
//               <li>
//                 Wind Speed{" "}
//                 <span className="temp">
//                   {Math.round(weather.wind.speed)} Km/h
//                 </span>
//               </li>
//             </div>
//           ) : (
//             <li>
//               {error.query} {error.message}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }
// export default Forcast;
import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [loggedIn, setLoggedIn] = useState(true); // Mocking user login state
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Fetch weather for the given city
  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${
          city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  // Fetch weather based on the user's current location
  const getWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        axios
          .get(
            `${apiKeys.base}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKeys.key}`
          )
          .then((response) => {
            setWeather(response.data);
            setQuery("");
          })
          .catch((error) => {
            console.log(error);
            setWeather("");
            setError({ message: "Location Not Found" });
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Save the current city to favorites
  const saveFavorite = () => {
    if (loggedIn) {
      const updatedFavorites = [...favorites, weather.name];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      alert(`${weather.name} has been added to your favorites!`);
    } else {
      alert("Please log in to save favorites.");
    }
  };

  useEffect(() => {
    getWeatherByLocation(); // Fetch weather based on user's location when the component mounts
  }, []);

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast">
      <div className="forecast-icon">
        <ReactAnimatedWeather
          icon={props.icon}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
      </div>

      <div className="today-weather">
        <h3>{props.weather}</h3>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box">
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
              onClick={() => search(query)}
            />
          </div>
        </div>

        <ul>
          {typeof weather.main !== "undefined" ? (
            <div>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
                </span>
              </li>
              <li>
                Humidity{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
              {loggedIn && (
                <button onClick={saveFavorite}>Save to Favorites</button>
              )}
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>

        {loggedIn && favorites.length > 0 && (
          <div className="favorites-list">
            <h3>Your Favorite Cities:</h3>
            <ul>
              {favorites.map((city, index) => (
                <li key={index}>{city}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forcast;
