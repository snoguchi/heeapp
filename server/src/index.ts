'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const { nanoid } = require('nanoid');
const socketio = require('socket.io');

import { Room, JoinRoomRequest, SendEmotionRequest, RoomResponse } from 'shared/api-interfaces';

import defaultEmotions from './default-emotions';

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 3000;

type Callback<T> = (response: T) => void;

const roomMap = new Map<string, Room>();

app.use(express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/room/:roomId', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/room.html'));
});

io.on('connection', (socket) => {
  let room: Room = null;

  socket.on('create', (callback: Callback<RoomResponse>) => {
    if (room !== null) {
      return callback({ error: 'Already in room' });
    }

    const roomId = nanoid();

    if (roomMap.has(roomId)) {
      return callback({ error: 'Already exists' });
    }

    room = {
      roomId,
      createdAt: Date.now(),
      emotions: defaultEmotions(),
    };

    roomMap.set(roomId, room);
    console.log(`room ${roomId} created`);
    socket.join(roomId, () => {
      callback({ error: null, room });
    });
  });

  socket.on('join', (param: JoinRoomRequest, callback: Callback<RoomResponse>) => {
    const { roomId } = param;

    if (!roomId) {
      return callback({ error: 'Invalid parameter' });
    }

    if (!roomMap.has(roomId)) {
      return callback({ error: 'No room found' });
    }

    if (room !== null) {
      return callback({ error: 'Already in room' });
    }

    room = roomMap.get(roomId);
    socket.join(roomId, () => {
      callback({ error: null, room });
    });
  });

  socket.on('leave', (callback: Callback<RoomResponse>) => {
    if (room === null) {
      return callback({ error: 'You are not in room' });
    }

    socket.leave(room.roomId, () => {
      room = null;
      callback({ error: null, room });
    });
  });

  socket.on('emotion', (param: SendEmotionRequest, callback: Callback<RoomResponse>) => {
    const { emotionId } = param;

    if (!emotionId || room === null) {
      return callback({ error: 'Invalid parameter' });
    }

    const emotion = room.emotions.find((emotion) => emotion.emotionId === emotionId);

    if (!emotion) {
      return callback({ error: 'No emotion found' });
    }

    emotion.total++;

    const now = Date.now();
    if (now >= emotion.feverEndAt) {
      emotion.fever = 1;
    } else {
      emotion.fever++;
    }
    emotion.feverEndAt = now + 10 * 1000;

    callback({ error: null, room });
    socket.to(room.roomId).emit('update', room);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
