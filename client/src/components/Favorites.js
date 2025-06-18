import React from 'react';

function Favorites({ recipes }) {
  const favorites = [];
  return (
    <div>
      <h2>Favorites (Broken)</h2>
      {favorites.length === 0 ? (
        <div>No favorites yet (broken)</div>
      ) : (
        <ul>
          {favorites.map((r, i) => <li key={i}>{r.title}</li>)}
        </ul>
      )}
    </div>
  );
}

export default Favorites; 