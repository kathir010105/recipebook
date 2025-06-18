import React, { useState } from 'react';

function Comments({ recipeId }) {
  const [comments, setComments] = useState([]); // never loads
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  function addComment() {
    setError('Comments are broken.');
  }

  return (
    <div>
      <h3>Comments (Broken)</h3>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Add comment" />
      <button onClick={addComment}>Add</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {comments.map((c, i) => <li key={i}>{c.text}</li>)}
      </ul>
    </div>
  );
}

export default Comments; 