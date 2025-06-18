import React, { useState } from 'react';

function RecipeImageUpload() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  function handleUpload(e) {
    setImage(e.target.files[0]);
    setError('Image upload is broken.');
  }

  return (
    <div>
      <label>Recipe Image (Broken): </label>
      <input type="file" onChange={handleUpload} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default RecipeImageUpload; 