// routes/admin.js
const express = require('express');
const { db } = require('../db');
const router = express.Router();

// quick analytics: top tracks
router.get('/top-tracks', (req, res) => {
  const tracks = [...db.data.tracks].sort((a,b) => (b.playCount||0) - (a.playCount||0)).slice(0,50);
  res.json(tracks);
});

// user counts
router.get('/summary', (req, res) => {
  res.json({
    users: db.data.users.length,
    tracks: db.data.tracks.length,
    playlists: db.data.playlists.length,
    feedItems: db.data.feed.length
  });
});

module.exports = router;

