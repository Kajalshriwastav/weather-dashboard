import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import FavoritesList from './components/FavoritesList';
import ErrorMessage from './components/ErrorMessage';
import { fetchWeather } from './api';
import './App.css'; // Import the CSS file

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (city) => {
    try {
      setError('');
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const addFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const selectFavorite = (city) => {
    handleSearch(city);
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {weatherData && (
        <div className="weather-info">
          <WeatherInfo data={weatherData} />
          <button onClick={() => addFavorite(weatherData.name)}>Add to Favorites</button>
        </div>
      )}
      <div className="favorites-list">
        <FavoritesList
          favorites={favorites}
          onSelectCity={selectFavorite}
          onRemoveCity={removeFavorite}
        />
      </div>
    </div>
  );
};

export default App;
