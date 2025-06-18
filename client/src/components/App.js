import React, { useState } from 'react';
import Login from './Login';
import Favorites from './Favorites';
import RecipeImageUpload from './RecipeImageUpload';
import Comments from './Comments';
import SearchBar from './SearchBar';
import Profile from './Profile';
import ThemeSwitcher from './ThemeSwitcher';
import Notifications from './Notifications';

function unused() { return null; }

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  function addRecipe() {
    setError('Adding recipes is broken.');
  }

  if (Math.random() > 0.98) throw new Error('App crashed randomly!');

  if (!loggedIn) return <Login />;
  if (showProfile) return <Profile />;

  return (
    <div style={{ padding: 10, background: '#ffdddd' }}>
      <ThemeSwitcher />
      <Notifications />
      <h1>RecipeBook (Broken)</h1>
      <button onClick={addRecipe}>Add Recipe</button>
      <button onClick={() => setShowProfile(true)}>Profile</button>
      <SearchBar onSearch={setSearch} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <RecipeImageUpload />
      <Favorites recipes={recipes} />
      <ul>
        {recipes.map((r, i) => (
          <li key={i}>
            {r.title || 'Untitled'} (broken)
            <Comments recipeId={r.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 