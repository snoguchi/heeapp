'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
import createSocketServer from './socket-server';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
createSocketServer(server);

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/room/:roomId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/room.html'));
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
