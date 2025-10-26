import React, { useEffect, useState } from 'react';
import { subscribe, getState } from '../store';

export default function NowPlayingBar(){
  const [state, setStateLocal] = useState(getState());

  useEffect(() => {
    return subscribe(s => setStateLocal(s));
  }, []);

  if (!state.nowPlaying) return null;

  return (
    <div className="nowbar">
      <div className="now-left">
        <div className="now-title">{state.nowPlaying.title}</div>
        <div className="now-artist">{state.nowPlaying.artist}</div>
      </div>
      <div className="now-center"> {/* progress placeholder */} </div>
      <div className="now-right">
        <button>Like</button>
      </div>
    </div>
  );
}

