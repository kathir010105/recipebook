import React, { useState, useEffect } from 'react';
import AuthPage from './Login';
import Favorites from './Favorites';
import RecipeImageUpload from './RecipeImageUpload';
import Comments from './Comments';
import SearchBar from './SearchBar';
import Profile from './Profile';
import ThemeSwitcher from './ThemeSwitcher';
import Notifications from './Notifications';

function NavBar({ onSearch, onAddRecipe, onShowFavorites, onShowProfile, onHome }) {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      background: '#f5f7fa',
      borderRadius: 8,
      marginBottom: 20,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={"logo.png"} alt="logo" style={{ width: 50, height: 50, cursor: 'pointer' }} onClick={onHome} />
        <SearchBar onSearch={onSearch} />
        <ThemeSwitcher />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onAddRecipe} style={{ padding: '8px 14px', borderRadius: 6, border: 'none', background: '#4f8cff', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Add Recipe</button>
        <button onClick={onShowFavorites} style={{ padding: '8px 14px', borderRadius: 6, border: 'none', background: '#f7b731', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Favourites</button>
        <button onClick={onShowProfile} style={{ padding: '8px 14px', borderRadius: 6, border: 'none', background: '#222', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Profile</button>
      </div>
    </nav>
  );
}

function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [search, setSearch] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', image: '' });
  const [imagePreview, setImagePreview] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(setRecipes)
      .catch(() => setError('Failed to fetch recipes'));
  }, []);

  function handleAddRecipeChange(e) {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      const file = files[0];
      if (file.size > 1024 * 1024) { // 1MB
        setError('Image size should be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        let result = reader.result;
        // Ensure the result has a data URL prefix
        if (!/^data:image\//.test(result)) {
          result = `data:${file.type};base64,` + btoa(result);
        }
        setNewRecipe(r => ({ ...r, image: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewRecipe(r => ({ ...r, [name]: value }));
    }
  }

  function submitRecipe(e) {
    e.preventDefault();
    if (!newRecipe.title || !newRecipe.description) return;
    fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ ...newRecipe, author: 'me' })
    })
      .then(res => res.json())
      .then(recipe => {
        setRecipes(r => [...r, recipe]);
        setShowAddModal(false);
        setNewRecipe({ title: '', description: '', image: '' });
        setImagePreview('');
      })
      .catch(() => setError('Failed to add recipe'));
  }

  function toggleFavorite(recipe) {
    setFavorites(favs => favs.some(f => f._id === recipe._id) ? favs.filter(f => f._id !== recipe._id) : [...favs, recipe]);
  }

  function deleteRecipe(recipeId) {
    fetch(`/api/recipes/${recipeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        if (res.ok) {
          setRecipes(r => r.filter(rec => rec._id !== recipeId));
          setFavorites(favs => favs.filter(f => f._id !== recipeId));
        } else {
          setError('Failed to delete recipe');
        }
      })
      .catch(() => setError('Failed to delete recipe'));
  }

  if (!loggedIn) return <AuthPage onAuth={() => setLoggedIn(true)} />;
  if (showProfile) return <Profile onBack={() => setShowProfile(false)} />;

  return (
    <div style={{ padding: 10 }}>
      <Notifications />
      <NavBar
        onSearch={setSearch}
        onAddRecipe={() => setShowAddModal(true)}
        onShowFavorites={() => setShowFavorites(f => !f)}
        onShowProfile={() => setShowProfile(true)}
        onHome={() => { setShowFavorites(false); setShowProfile(false); }}
      />
      <h1>RecipeBook</h1>
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <form onSubmit={submitRecipe} style={{ background: '#fff', padding: 32, borderRadius: 12, minWidth: 340, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h2 style={{ textAlign: 'center' }}>Add Recipe</h2>
            <input name="title" placeholder="Title" value={newRecipe.title} onChange={handleAddRecipeChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc' }} />
            <textarea name="description" placeholder="Description" value={newRecipe.description} onChange={handleAddRecipeChange} required style={{ padding: 10, borderRadius: 6, border: '1px solid #ccc', minHeight: 60 }} />
            <input name="image" type="file" accept="image/*" onChange={handleAddRecipeChange} style={{ padding: 10 }} />
            <div style={{ fontSize: 13, color: '#888', marginBottom: -8, marginTop: -8 }}>
              (Recommended: max 1MB, 500x500px)
            </div>
            {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', alignSelf: 'center' }} />}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button type="submit" style={{ padding: '10px 24px', borderRadius: 6, border: 'none', background: '#4f8cff', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Add</button>
              <button type="button" onClick={() => { setShowAddModal(false); setImagePreview(''); setNewRecipe({ title: '', description: '', image: '' }); }} style={{ padding: '10px 24px', borderRadius: 6, border: 'none', background: '#eee', color: '#333', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {showFavorites ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, flexWrap: 'wrap', marginTop: 30 }}>
          {favorites.length === 0 ? <div>No favorites yet</div> : favorites.map((r, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220 }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                marginBottom: 16,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {r.image && /^data:image\//.test(r.image) ? (
                  <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#bbb' }}>No Image</span>
                )}
              </div>
              <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{r.title}</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button onClick={() => toggleFavorite(r)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#f7b731', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Remove from Favourites</button>
                <button onClick={() => deleteRecipe(r._id)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#ff4d4f', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              </div>
              <Comments recipeId={r._id || r.id} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, flexWrap: 'wrap', marginTop: 30 }}>
          {recipes.filter(r => r.title.toLowerCase().includes(search.toLowerCase())).map((r, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 220 }}>
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                marginBottom: 16,
                background: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {r.image && /^data:image\//.test(r.image) ? (
                  <img src={r.image} alt={r.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ color: '#bbb' }}>No Image</span>
                )}
              </div>
              <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 8 }}>{r.title}</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button onClick={() => toggleFavorite(r)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: favorites.some(f => f._id === r._id) ? '#f7b731' : '#eee', color: favorites.some(f => f._id === r._id) ? '#fff' : '#333', fontWeight: 600, cursor: 'pointer' }}>{favorites.some(f => f._id === r._id) ? 'Remove from Favourites' : 'Add to Favourites'}</button>
                <button onClick={() => deleteRecipe(r._id)} style={{ padding: '6px 12px', borderRadius: 6, border: 'none', background: '#ff4d4f', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
              </div>
              <Comments recipeId={r._id || r.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App; 