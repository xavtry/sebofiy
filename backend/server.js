// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const rateLimit = require('express-rate-limit');

const { init, db } = require('./db');
const authRoutes = require('./routes/auth');
const tracksRoutes = require('./routes/tracks');
const playlistsRoutes = require('./routes/playlists');
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/admin');
const ws = require('./ws');

async function main() {
  await init();
  const app = express();
  const server = http.createServer(app);

  app.use(helmet());
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // Basic rate limiting
  app.use(rateLimit({ windowMs: 1*60*1000, max: 120 }));

  app.use('/api/auth', authRoutes);
  app.use('/api/tracks', tracksRoutes);
  app.use('/api/playlists', playlistsRoutes);
  app.use('/api/search', searchRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/api/ping', (req, res) => res.json({ ok: true }));

  // static web UI can be served here in prod; dev uses Vite
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`Sebofiy backend running on http://localhost:${PORT}`);
  });

  ws.setup(server, db);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

