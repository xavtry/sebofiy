// seed.js
const { init, db } = require('./db');
const { createTrack } = require('./models/track');
const { createPlaylist } = require('./models/playlist');
const { createUser } = require('./models/user');

(async () => {
  await init();

  // avoid reseeding if data exists
  if ((db.data.tracks || []).length > 0) {
    console.log('DB already seeded');
    process.exit(0);
  }

  const alice = await createUser({ email: 'alice@example.com', password: 'password123', displayName: 'Alice' });
  const bob = await createUser({ email: 'bob@example.com', password: 'password123', displayName: 'Bob' });

  // create example tracks (no URLs - you add them)
  await createTrack({ title: 'Sunset Drive', artist: 'Demo Artist', album: 'Instrumentals', duration: 180, url: null });
  await createTrack({ title: 'Morning Coffee', artist: 'Demo Artist', album: 'Instrumentals', duration: 145, url: null });
  await createTrack({ title: 'Electric Bounce', artist: 'Synthwave Co.', album: 'Neon Nights', duration: 210, url: null });

  const pl = await createPlaylist({ ownerId: alice.id, name: 'My Vibes', description: 'Chill starters', isPublic: true });
  await db.write();
  console.log('Seed done');
  process.exit(0);
})();

