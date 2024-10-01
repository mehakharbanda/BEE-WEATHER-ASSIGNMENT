# Open-Weather-App
🌦️ Create a Weather App using Node.js, OpenWeatherAPI, and React 
This project demonstrates building a full-stack weather app using Node.js and OpenWeatherAPI on the backend, and React (created with Vite) on the frontend. The application lets registered users save weather forecasts for upcoming days while using essential middleware for robust functionality.

Key Features:
Node.js Backend:

Integrated OpenWeatherAPI to fetch real-time weather data.
Created RESTful routes to retrieve current and future weather.
Middlewares:
Custom error handling to capture API and server-side issues.
Unexpected route handling to manage unrecognized routes.
Implemented user authentication so only registered users can save weather forecasts for future days.
React Frontend with Vite:

Used Vite to create a fast React app with an intuitive UI.
Fetches current weather based on user location or city search.
Axios handles API calls to retrieve weather data.
Only logged-in users can store weather information for future days.
API Connection:

The backend API is connected to the React frontend, allowing live weather updates and user-specific features.
User-Specific Features:

Registration and login system implemented using JWT, allowing only authenticated users to save upcoming weather data.
Tech Stack:
Backend: Node.js, Express.js, OpenWeatherAPI
Frontend: React (Vite), Axios
Database: MongoDB for user data and saved forecasts
Middleware: Error handling, unexpected route handling, JWT authentication
This app integrates Node.js, React, and secure user features to provide a seamless weather tracking experience.
