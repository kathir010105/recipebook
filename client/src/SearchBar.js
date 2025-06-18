import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSearch() {
    // Broken: doesn't actually filter
    onSearch(query);
  }

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search recipes (broken)" />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar; 