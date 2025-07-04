import React from 'react';

function Favorites({ recipes }) {
  // For now, just show all recipes as favorites
  return (
    <div>
      <h2>Favorites</h2>
      {recipes.length === 0 ? (
        <div>No favorites yet</div>
      ) : (
        <ul>
          {recipes.map((r, i) => <li key={i}>{r.title}</li>)}
        </ul>
      )}
    </div>
  );
}

export default Favorites; 