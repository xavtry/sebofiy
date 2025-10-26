// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, sanitize } = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });
  const existing = await findUserByEmail(email);
  if (existing) return res.status(400).json({ error: 'email already used' });
  const user = await createUser({ email, password, displayName });
  const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ user: sanitize(user), token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await findUserByEmail(email);
  if (!u) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ sub: u.id }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ user: sanitize(u), token });
});

module.exports = router;

