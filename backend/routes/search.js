// routes/search.js
const express = require('express');
const { db } = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const tracks = db.data.tracks.filter(t => (t.title + ' ' + t.artist + ' ' + (t.album||'')).toLowerCase().includes(q));
  const playlists = db.data.playlists.filter(p => (p.name + ' ' + p.description).toLowerCase().includes(q));
  res.json({ tracks, playlists });
});

module.exports = router;

