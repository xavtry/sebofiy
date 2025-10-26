// store.js
const listeners = new Set();
let state = {
  queue: [],
  nowPlaying: null,
  playing: false
};

export function subscribe(cb) { listeners.add(cb); return ()=>listeners.delete(cb); }
export function getState(){ return state; }
export function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach(cb => cb(state));
}

