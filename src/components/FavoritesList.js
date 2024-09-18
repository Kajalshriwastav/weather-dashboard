import React from 'react';

const FavoritesList = ({ favorites, onSelectCity, onRemoveCity }) => {
  return (
    <div>
      <h3>Favorites</h3>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>
            <span onClick={() => onSelectCity(city)}>{city}</span>
            <button onClick={() => onRemoveCity(city)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
