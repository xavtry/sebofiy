// models/playlist.js
const { nanoid } = require('nanoid');
const { db } = require('../db');

async function createPlaylist({ ownerId, name, description = '', isPublic = false }) {
  const p = { id: 'p_' + nanoid(9), ownerId, name, description, isPublic, tracks: [], collaborators: [], createdAt: Date.now(), updatedAt: Date.now() };
  db.data.playlists.push(p);
  await db.write();
  return p;
}

function getPlaylist(id) {
  return db.data.playlists.find(p => p.id === id);
}

async function addTrackToPlaylist(playlistId, trackId) {
  const p = getPlaylist(playlistId);
  if (!p) throw new Error('Playlist not found');
  p.tracks.push(trackId);
  p.updatedAt = Date.now();
  await db.write();
  return p;
}

module.exports = { createPlaylist, getPlaylist, addTrackToPlaylist };

