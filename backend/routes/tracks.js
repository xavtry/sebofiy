// routes/tracks.js
const express = require('express');
const { listTracks, getTrack, incrementPlay, createTrack } = require('../models/track');
const { nanoid } = require('nanoid');

const router = express.Router();

// list tracks
router.get('/', (req, res) => {
  const tracks = listTracks();
  res.json(tracks);
});

// create track (admin)
router.post('/', async (req, res) => {
  const { title, artist, album, duration, url, cover } = req.body;
  // In prod, auth & permission check required
  const t = await createTrack({ title, artist, album, duration, url, cover });
  res.status(201).json(t);
});

router.get('/:id', (req, res) => {
  const t = getTrack(req.params.id);
  if (!t) return res.status(404).json({ error: 'not found' });
  res.json(t);
});

// mark play
router.post('/:id/play', async (req, res) => {
  const t = await incrementPlay(req.params.id);
  res.json(t);
});

module.exports = router;

