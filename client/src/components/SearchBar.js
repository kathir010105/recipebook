import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSearch() {
    onSearch(query);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch();
  }

  return (
    <div className=''>
      <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} placeholder="Search recipes" />
      <button onClick={handleSearch}>Search</button>
    
    </div>
  );
}

export default SearchBar; 