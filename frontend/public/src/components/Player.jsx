import React, { useEffect, useRef, useState } from 'react';
import { getTrack } from '../api';
import { subscribe, getState, setState } from '../store';

export default function Player(){
  const audioRef = useRef();
  const [state, setLocalState] = useState(getState());

  useEffect(() => {
    const unsub = subscribe(s => setLocalState(s));
    return unsub;
  }, []);

  useEffect(() => {
    const np = state.nowPlaying;
    if (!np) return;
    // load URL: np.url should be provided by backend (or remote CDN)
    if (audioRef.current) {
      audioRef.current.src = np.url || '';
      if (np.url) audioRef.current.play().catch(()=>{});
    }
  }, [state.nowPlaying]);

  function togglePlay(){
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setState({ playing: true });
    } else {
      audioRef.current.pause();
      setState({ playing: false });
    }
  }

  function onEnded(){
    // simple: pop queue
    const q = state.queue.slice(1);
    setState({ queue: q, nowPlaying: q[0] || null });
  }

  if (!state.nowPlaying) return <div className="player empty">Select a track to play</div>;

  return (
    <div className="player">
      <div className="meta">
        <div className="title">{state.nowPlaying.title}</div>
        <div className="artist">{state.nowPlaying.artist}</div>
      </div>

      <audio ref={audioRef} onEnded={onEnded} controls style={{ width:'100%' }} />

      <div className="controls">
        <button onClick={togglePlay}>{state.playing ? 'Pause' : 'Play'}</button>
      </div>
    </div>
  );
}

