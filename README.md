# Sebofiy — full-featured streaming app skeleton (code only)

Sebofiy is a developer-focused, legal, code-only reimplementation of a modern music streaming service (UI + APIs + realtime + offline support) — **no media included**. Use it to build your own streaming product, connect licensed audio, or integrate with providers.

## Features implemented in code
- User accounts (email/password + JWT)
- Search (title/artist/playlist)
- Tracks metadata store (no audio files included)
- Playlists (create / edit / collaborative)
- Player UI (browser audio element, queue management, gapless stubs)
- Now Playing + queue sync across tabs/devices using WebSocket
- Social feed (likes / comments) - lightweight
- Realtime collaborative queue (WebSocket)
- Recommendations engine stub (simple collaborative filter)
- Admin panel + basic analytics endpoints
- Offline-first scaffolding (Service Worker + IndexedDB stubs)
- Payment/subscription stub endpoints (Stripe hooks commented)
- Ready to connect to S3/CDN or streaming provider
- CI / deploy notes

## Quick start (dev)
1. `cd backend` → `npm install` → copy `.env.example` to `.env`, fill values → `npm run seed` → `npm run dev`
2. `cd frontend` → `npm install` → `npm run dev`
3. Frontend expects backend at `http://localhost:4000` by default.

## Legal
Do **not** add copyrighted audio to this repo unless you own license. Use royalty-free audio or integrate via licensed streaming APIs.

