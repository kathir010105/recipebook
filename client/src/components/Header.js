import React from 'react';

function Header() {
  return (
    <header style={{ background: '#333', color: 'white', padding: 10 }}>
      <h1>RecipeBook</h1>
      <nav>
        <a href="#" style={{ color: 'white', marginRight: 10 }}>Home</a>
        <a href="#" style={{ color: 'white', marginRight: 10 }}>Recipes</a>
        <a href="#" style={{ color: 'white' }}>Profile</a>
      </nav>
    </header>
  );
}

export default Header; 