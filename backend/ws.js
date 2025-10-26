// ws.js
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

let wss;

function setup(server, db) {
  wss = new WebSocket.Server({ server, path: '/ws' });

  wss.on('connection', (ws, req) => {
    // simple handshake: client can send {type:'identify', token}
    ws.isAlive = true;
    ws.on('pong', () => ws.isAlive = true);

    ws.on('message', msg => {
      try {
        const data = JSON.parse(msg.toString());
        if (data.type === 'identify') {
          ws.userId = data.userId || null;
          ws.send(JSON.stringify({ type: 'identified', userId: ws.userId }));
          return;
        }

        // collaborative queue event
        if (data.type === 'queue:update') {
          // broadcast to other clients
          wss.clients.forEach(c => {
            if (c !== ws && c.readyState === WebSocket.OPEN) {
              c.send(JSON.stringify({ type: 'queue:update', payload: data.payload }));
            }
          });
        }

        // now-playing sync
        if (data.type === 'now:playing') {
          wss.clients.forEach(c => {
            if (c !== ws && c.readyState === WebSocket.OPEN) {
              c.send(JSON.stringify({ type: 'now:playing', payload: data.payload }));
            }
          });
        }

      } catch (err) {
        console.warn('ws parse err', err);
      }
    });
  });

  // ping/pong to remove dead sockets
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();
      ws.isAlive = false;
      ws.ping(() => {});
    });
  }, 30000);
}

module.exports = { setup };

