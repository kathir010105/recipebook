import React, { useState, useEffect } from 'react';

function Comments({ recipeId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/comments?recipeId=${recipeId}`)
      .then(res => res.json())
      .then(setComments)
      .catch(() => setError('Failed to fetch comments'));
  }, [recipeId]);

  function addComment() {
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({ recipeId, text })
    })
      .then(res => res.json())
      .then(comment => setComments(c => [...c, comment]))
      .catch(() => setError('Failed to add comment'));
    setText('');
  }

  return (
    <div>
      <h3>Comments</h3>
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