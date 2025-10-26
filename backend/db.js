// db.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const file = process.env.DB_FILE || path.join(__dirname, 'data', 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

async function init() {
  await db.read();
  db.data = db.data || { users: [], tracks: [], playlists: [], feed: [], analytics: {} };
  await db.write();
}

module.exports = { db, init };
