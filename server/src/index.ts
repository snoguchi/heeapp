'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const { nanoid } = require('nanoid');
const socketio = require('socket.io');

import { Room, CreateRoom, JoinRoom, AddEmotion, SendEmotion, RemoveEmotion } from 'shared/api-interfaces';

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

  socket.on('create-room', (callback: Callback<CreateRoom.ResponseParam>) => {
    if (room !== null) {
      return callback({ error: 'NotAllowed' });
    }

    const roomId = nanoid();

    if (roomMap.has(roomId)) {
      return callback({ error: 'UnexpectedError' });
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

  socket.on('join-room', (param: JoinRoom.RequestParam, callback: Callback<JoinRoom.ResponseParam>) => {
    const { roomId } = param;

    if (!roomId) {
      return callback({ error: 'InvalidParameter' });
    }

    if (!roomMap.has(roomId)) {
      return callback({ error: 'NoRoomFound' });
    }

    if (room !== null) {
      return callback({ error: 'NotAllowed' });
    }

    room = roomMap.get(roomId);
    socket.join(roomId, () => {
      callback({ error: null, room });
    });
  });

  socket.on('add-emotion', (param: AddEmotion.RequestParam, callback: Callback<AddEmotion.ResponseParam>) => {
    const { label, soundUrl, feverSoundUrl } = param;

    if (!label || !soundUrl) {
      return callback({ error: 'InvalidParameter' });
    }

    if (room === null) {
      return callback({ error: 'NotAllowed' });
    }

    const emotionId = 'emo:' + nanoid();
    const createdBy = socket.id;

    room.emotions.push({
      emotionId,
      createdBy,
      label,
      soundUrl,
      total: 0,
      fever: 0,
      feverEndAt: 0,
      feverSoundUrl,
    });

    callback({ error: null, room });
    socket.to(room.roomId).emit('room-update', { room });
  });

  socket.on('remove-emotion', (param: RemoveEmotion.RequestParam, callback: Callback<RemoveEmotion.ResponseParam>) => {
    const { emotionId } = param;

    if (!emotionId) {
      return callback({ error: 'InvalidParameter' });
    }

    if (room === null) {
      return callback({ error: 'NotAllowed' });
    }

    const emotion = room.emotions.find((emotion) => emotion.emotionId === emotionId);

    if (!emotion) {
      return callback({ error: 'NoEmotionFound' });
    }

    if (emotion.createdBy !== socket.id) {
      return callback({ error: 'NotAllowed' });
    }

    room.emotions = room.emotions.filter((emotion) => emotion.emotionId !== emotionId);

    callback({ error: null, room });
    socket.to(room.roomId).emit('room-update', { room });
  });

  socket.on('send-emotion', (param: SendEmotion.RequestParam, callback: Callback<SendEmotion.ResponseParam>) => {
    const { emotionId } = param;

    if (!emotionId) {
      return callback({ error: 'InvalidParameter' });
    }

    if (room === null) {
      return callback({ error: 'NotAllowed' });
    }

    const emotion = room.emotions.find((emotion) => emotion.emotionId === emotionId);

    if (!emotion) {
      return callback({ error: 'NoEmotionFound' });
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
    socket.to(room.roomId).emit('room-update', { room });
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
