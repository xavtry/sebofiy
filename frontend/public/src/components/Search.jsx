import React, { useState } from 'react';

export default function Search({ onSearch }){
  const [q, setQ] = useState('');
  function submit(e){ e.preventDefault(); onSearch(q); }
  return (
    <form className="search" onSubmit={submit}>
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search tracks, artists, playlists" />
      <button>Search</button>
    </form>
  );
}

