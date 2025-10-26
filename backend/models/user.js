
// models/user.js
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const { db } = require('../db');

async function createUser({ email, password, displayName }) {
  const hash = await bcrypt.hash(password, 10);
  const user = { id: 'u_' + nanoid(10), email, passwordHash: hash, displayName: displayName || 'New User', createdAt: Date.now(), following: [], likedTracks: [] };
  db.data.users.push(user);
  await db.write();
  return sanitize(user);
}

async function findUserByEmail(email) {
  return db.data.users.find(u => u.email === email);
}

async function findUserById(id) {
  return db.data.users.find(u => u.id === id);
}

function sanitize(user) {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}

module.exports = { createUser, findUserByEmail, findUserById, sanitize };

