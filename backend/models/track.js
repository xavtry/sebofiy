// models/track.js
const { nanoid } = require('nanoid');
const { db } = require('../db');

async function createTrack({ title, artist, album, duration = 0, url = null, cover = null }) {
  const t = { id: 't_' + nanoid(9), title, artist, album, duration, url, cover, createdAt: Date.now(), playCount: 0 };
  db.data.tracks.push(t);
  await db.write();
  return t;
}

function listTracks() {
  return db.data.tracks;
}

function getTrack(id) {
  return db.data.tracks.find(t => t.id === id);
}

async function incrementPlay(id) {
  const t = getTrack(id);
  if (t) { t.playCount = (t.playCount || 0) + 1; await db.write(); }
  return t;
}

module.exports = { createTrack, listTracks, getTrack, incrementPlay };

