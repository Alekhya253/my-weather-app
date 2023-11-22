// SearchBar.js
import React from 'react';
import './WeatherDisplay.css';

const SearchBar = ({ city, setCity, onSearch }) => {
  return (
    <div>
      <div className='title-container'>
        <p className='title'>Weather</p>
      </div>
      <input
        type='text'
        placeholder='Enter city name'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
