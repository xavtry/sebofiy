import React, { useEffect, useState } from 'react';
import { listTracks, search } from './api';
import Player from './components/Player';
import Search from './components/Search';
import Library from './components/Library';
import NowPlayingBar from './components/NowPlayingBar';
import { setState } from './store';

export default function App() {
  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function load() {
      const t = await listTracks();
      setTracks(t);
    }
    load();
  }, []);

  async function doSearch(q) {
    setQuery(q);
    if (!q) {
      const t = await listTracks();
      setTracks(t);
      return;
    }
    const res = await search(q);
    setTracks(res.tracks);
  }

  function playTrack(track) {
    // push to global queue and set now playing
    setState({ nowPlaying: track, playing: true, queue: [track] });
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">sebofiy</div>
        <Search onSearch={doSearch} />
      </header>

      <main className="main">
        <section className="left">
          <Library tracks={tracks} onPlay={playTrack} />
        </section>
        <aside className="right">
          <Player />
        </aside>
      </main>

      <NowPlayingBar />
    </div>
  );
}

