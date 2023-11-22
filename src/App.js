// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    // Get weather data for the current location on initial load
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      await getWeatherData(latitude, longitude);
      await getDailyWeather(latitude, longitude);
    });
  }, []);

  const getWeatherData = async (latitude, longitude) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getDailyWeather = async (latitude, longitude) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const dailyApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    try {
      const dailyResponse = await axios.get(dailyApiUrl);
      setDailyWeather(dailyResponse.data);
    } catch (error) {
      console.error('Error fetching daily weather data:', error);
    }
  };

  const handleSearch = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const encodedCity = encodeURIComponent(city);
    const searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}`;

    try {
      const searchResponse = await axios.get(searchApiUrl);
      const { lat, lon } = searchResponse.data.coord;
      await getWeatherData(lat, lon);
      await getDailyWeather(lat, lon);
    } catch (error) {
      console.error(
        'Error fetching weather data for the searched city:',
        error
      );
    }
  };

  return (
    <div>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
      {weatherData && dailyWeather && (
        <WeatherDisplay weatherData={weatherData} dailyWeather={dailyWeather} />
      )}
    </div>
  );
};

export default App;
