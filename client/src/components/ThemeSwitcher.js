import React, { useState } from 'react';

// Icons8 CDN links for sun and moon icons
const sunIcon = 'https://img.icons8.com/ios-filled/30/000000/sun--v1.png';
const moonIcon = 'https://img.icons8.com/?size=100&id=59841&format=png&color=000000';

function ThemeSwitcher() {
  const [dark, setDark] = useState(false);
  function toggleTheme() {
    setDark(d => !d);
    document.body.style.background = !dark ? '#222' : '#fff';
    document.body.style.color = !dark ? '#fff' : '#222';
  }
  return (
    <button
      onClick={toggleTheme}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        margin: 10,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        width: 40,
        height: 40,
        transition: 'background 0.2s',
      }}
    >
      <img
        src={dark ? sunIcon : moonIcon}
        alt={dark ? 'Light mode' : 'Dark mode'}
        style={{ width: 28, height: 28, filter: dark ? 'invert(1)' : 'none', transition: 'filter 0.2s' }}
      />
    </button>
  );
}

export default ThemeSwitcher; 