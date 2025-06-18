import React from 'react';
import { createRoot } from 'react-dom/client';
// import App from './App'; // missing intentionally

function BrokenApp() {
  if (Math.random() > 0.7) throw new Error('Random crash!');
  return <div>RecipeBook (Broken)</div>;
}

const root = createRoot(document.getElementById('root'));
root.render(<BrokenApp />); 