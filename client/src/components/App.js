import React, { useState, useEffect } from 'react';
import AuthPage from './Login';
import Favorites from './Favorites';
import RecipeImageUpload from './RecipeImageUpload';
import Comments from './Comments';
import SearchBar from './SearchBar';
import Profile from './Profile';
import ThemeSwitcher from './ThemeSwitcher';
import Notifications from './Notifications';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(setRecipes)
      .catch(() => setError('Failed to fetch recipes'));
  }, []);

  function addRecipe() {
    const title = prompt('Recipe title?');
    const description = prompt('Recipe description?');
    if (!title || !description) return;
    fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, author: 'me' })
    })
      .then(res => res.json())
      .then(recipe => setRecipes(r => [...r, recipe]))
      .catch(() => setError('Failed to add recipe'));
  }

  if (!loggedIn) return <AuthPage onAuth={() => setLoggedIn(true)} />;
  if (showProfile) return <Profile onBack={() => setShowProfile(false)} />;

  return (
    <div style={{ padding: 10 }}>
      <ThemeSwitcher />
      <Notifications />
      <h1>RecipeBook</h1>
      <button onClick={addRecipe}>Add Recipe</button>
      <button onClick={() => setShowProfile(true)}>Profile</button>
      <SearchBar onSearch={setSearch} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <RecipeImageUpload />
      <Favorites recipes={recipes} />
      <ul>
        {recipes.filter(r => r.title.toLowerCase().includes(search.toLowerCase())).map((r, i) => (
          <li key={i}>
            {r.title}
            <Comments recipeId={r._id || r.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App; 