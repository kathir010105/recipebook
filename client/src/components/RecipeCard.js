import React from 'react';

function RecipeCard({ recipe }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, margin: 10 }}>
      <h3>{recipe.title || 'Untitled Recipe'}</h3>
      <p>{recipe.description || 'No description available'}</p>
      <small>By: {recipe.author || 'Unknown'}</small>
    </div>
  );
}

export default RecipeCard; 