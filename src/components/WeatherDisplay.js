// WeatherDisplay.js
import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, dailyWeather }) => {
  if (!weatherData || !dailyWeather) {
    return <div>Loading...</div>;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const currentDate = new Date(); // Get the current date
  const maxDays = 4; // Number of days to include

  const filteredDailyWeather = dailyWeather.list.reduce((acc, entry) => {
    const entryDate = new Date(entry.dt * 1000);
    const dateDiff = Math.ceil(
      (entryDate - currentDate) / (1000 * 60 * 60 * 24)
    ); // Calculate the difference in days

    // Check if the entry date is within the next 4 days
    if (dateDiff > 1 && dateDiff <= maxDays) {
      const dateKey = entryDate.toLocaleDateString('en-US');
      acc[dateKey] = entry;
    }

    return acc;
  }, {});
  const dailyEntries = Object.values(filteredDailyWeather);

  return (
    <>
      <div className='current-weather'>
        <div className='temp'>
          <div className='name'>
            <span className='curr-place'>{weatherData.name} </span>
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt='Weather Icon'
            />
          </div>

          <p className='curr-temp'>
            {Number((weatherData.main.temp - 273.15).toFixed(2))} °C
          </p>
          <p className='curr-desc'>{weatherData.weather[0].description}</p>
        </div>
        <div className='other-data-card'>
          <p>
            Feels Like:{' '}
            <span className='data'>
              {Number((weatherData.main.feels_like - 273.15).toFixed(2))} °C
            </span>
          </p>
          <p>
            Pressure:{' '}
            <span className='data'>{weatherData.main.pressure} hPa</span>
          </p>
          <p>
            Humidity: <span className='data'>{weatherData.main.humidity}%</span>
          </p>
          <p>
            Visibility:{' '}
            <span className='data'>{weatherData.visibility} meters</span>
          </p>
          <p>
            Wind Speed:{' '}
            <span className='data'>{weatherData.wind.speed} m/s</span>,
            Direction: <span className='data'>{weatherData.wind.deg}°</span>
          </p>
          <p>
            Sunrise:{' '}
            <span className='data'>
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
            </span>{' '}
            Sunset:{' '}
            <span className='data'>
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
            </span>
          </p>
        </div>
      </div>
      <div className='day-container'>
        {dailyEntries.map((day, index) => (
          <div key={index} className='day-card'>
            <div className='name'>
              <span>
                {capitalizeFirstLetter(
                  new Date(day.dt * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                  })
                )}
              </span>
              <img
                src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                alt='Weather Icon'
              />
            </div>
            <h1 className='day-temp'>
              {' '}
              {Number((day.main.temp - 273.15).toFixed(2))} °C
            </h1>
            <p className='day-desc'>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherDisplay;
