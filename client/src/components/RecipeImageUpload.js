import React, { useState } from 'react';

function RecipeImageUpload() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  function handleUpload(e) {
    setImage(e.target.files[0]);
    setError(null);
    // TODO: Implement image upload logic
  }

  return (
    <div>
      <label>Recipe Image: </label>
      <input type="file" onChange={handleUpload} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default RecipeImageUpload; 