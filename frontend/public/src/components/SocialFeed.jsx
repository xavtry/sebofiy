import React from 'react';

export default function SocialFeed({ items = [] }) {
  return (
    <div className="feed">
      <h3>Social</h3>
      {items.map(it => <div className="feed-item" key={it.id}>{it.actor}: {it.text}</div>)}
    </div>
  );
}

