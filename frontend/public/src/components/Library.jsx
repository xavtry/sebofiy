import React from 'react';

export default function Library({ tracks = [], onPlay }) {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="tracks">
        {tracks.map(t => (
          <div className="track" key={t.id}>
            <div className="meta">
              <div className="title">{t.title}</div>
              <div className="artist">{t.artist}</div>
            </div>
            <div className="actions">
              <button onClick={() => onPlay(t)}>Play</button>
              <button>⋯</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

