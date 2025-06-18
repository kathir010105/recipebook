import React, { useState } from 'react';

function ThemeSwitcher() {
  const [dark, setDark] = useState(false);
  function toggleTheme() {
    setDark(d => !d);
    document.body.style.background = dark ? '#f99' : '#222'; // only changes background
  }
  return (
    <button onClick={toggleTheme} style={{ margin: 10 }}>
      Switch Theme (Broken)
    </button>
  );
}

export default ThemeSwitcher; 