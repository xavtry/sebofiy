// routes/playlists.js
const express = require('express');
const { createPlaylist, getPlaylist, addTrackToPlaylist } = require('../models/playlist');

const router = express.Router();

router.get('/:id', (req, res) => {
  const p = getPlaylist(req.params.id);
  if (!p) return res.status(404).json({ error: 'not found' });
  res.json(p);
});

router.post('/', async (req, res) => {
  // in prod: authenticate; here we allow anonymous ownerId via body
  const { ownerId, name, description, isPublic } = req.body;
  const p = await createPlaylist({ ownerId, name, description, isPublic });
  res.status(201).json(p);
});

router.post('/:id/tracks', async (req, res) => {
  const { trackId } = req.body;
  try {
    const p = await addTrackToPlaylist(req.params.id, trackId);
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

