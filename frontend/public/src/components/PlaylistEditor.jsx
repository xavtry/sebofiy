import React, { useState } from 'react';

export default function PlaylistEditor({ playlist, onSave }) {
  const [name, setName] = useState(playlist?.name || '');
  const [description, setDescription] = useState(playlist?.description || '');

  return (
    <div className="playlist-editor">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Playlist name" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
      <button onClick={() => onSave({ ...playlist, name, description })}>Save</button>
    </div>
  );
}

