const { nanoid } = require('nanoid');
const socketio = require('socket.io');
import { Room, CreateRoom, JoinRoom, AddEmotion, SendEmotion, RemoveEmotion } from 'shared/api-interfaces';
import { getDefaultDataStore } from './data-store';
import { getDefaultEmotions } from './config';

type Callback<T> = (response: T) => void;

interface Session {
  room: Room | null;
}

const dataStore = getDefaultDataStore();

const createRoom = async (
  params: CreateRoom.RequestParam,
  callback: Callback<CreateRoom.ResponseParam>,
  session: Session,
  socket,
  server
) => {
  if (session.room !== null) {
    return callback({ error: 'NotAllowed' });
  }

  const roomId = nanoid();

  const room: Room = {
    roomId,
    createdAt: Date.now(),
    emotions: getDefaultEmotions(),
    numberOfActiveConnections: 0,
  };

  await dataStore.addRoom(room);

  console.log(`room ${roomId} created`);

  socket.join(roomId, () => {
    room.numberOfActiveConnections = server.sockets.adapter.rooms[roomId]?.length || 0;
    session.room = room;
    callback({ error: null, room });
  });
};

const joinRoom = async (
  params: JoinRoom.RequestParam,
  callback: Callback<JoinRoom.ResponseParam>,
  session: Session,
  socket,
  server
) => {
  const { roomId } = params;

  if (!roomId) {
    return callback({ error: 'InvalidParameter' });
  }

  if (session.room !== null) {
    return callback({ error: 'NotAllowed' });
  }

  const room: Room = await dataStore.getRoom(roomId);
  if (!room) {
    return callback({ error: 'NoRoomFound' });
  }

  socket.join(roomId, () => {
    room.numberOfActiveConnections = server.sockets.adapter.rooms[roomId]?.length || 0;
    session.room = room;
    callback({ error: null, room });
    socket.to(roomId).emit('room-update', { room });
  });
};

const addEmotion = (
  params: AddEmotion.RequestParam,
  callback: Callback<AddEmotion.ResponseParam>,
  session: Session,
  socket,
  server
) => {
  const { label, soundUrl, feverSoundUrl } = params;
  const { room } = session;

  if (!label || !soundUrl) {
    return callback({ error: 'InvalidParameter' });
  }

  if (session.room === null) {
    return callback({ error: 'NotAllowed' });
  }

  const emotionId = 'emo:' + nanoid();

  room.emotions.push({
    emotionId,
    createdAt: Date.now(),
    label,
    soundUrl,
    count: 0,
    feverCount: 0,
    feverEndAt: 0,
    feverSoundUrl,
  });

  room.numberOfActiveConnections = server.sockets.adapter.rooms[room.roomId]?.length || 0;

  callback({ error: null, room });
  socket.to(room.roomId).emit('room-update', { room });
  dataStore.updateRoom(room);
};

const removeEmotion = (
  params: RemoveEmotion.RequestParam,
  callback: Callback<RemoveEmotion.ResponseParam>,
  session: Session,
  socket,
  server
) => {
  const { emotionId } = params;
  const { room } = session;

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

  room.emotions = room.emotions.filter((emotion) => emotion.emotionId !== emotionId);
  room.numberOfActiveConnections = server.sockets.adapter.rooms[room.roomId]?.length || 0;

  callback({ error: null, room });
  socket.to(room.roomId).emit('room-update', { room });

  dataStore.updateRoom(room);
};

const sendEmotion = (
  params: SendEmotion.RequestParam,
  callback: Callback<SendEmotion.ResponseParam>,
  session: Session,
  socket,
  server
) => {
  const { emotionId } = params;
  const { room } = session;

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

  emotion.count++;

  const now = Date.now();
  if (now >= emotion.feverEndAt) {
    emotion.feverCount = 1;
  } else {
    emotion.feverCount++;
  }
  emotion.feverEndAt = now + 10 * 1000;

  room.numberOfActiveConnections = server.sockets.adapter.rooms[room.roomId]?.length || 0;

  callback({ error: null, emotion });
  socket.to(room.roomId).emit('emotion-update', { emotion });

  dataStore.lazyUpdateRoom(room, 10000);
};

const leaveRoom = (session: Session, socket, server) => {
  const { room } = session;
  if (room) {
    room.numberOfActiveConnections = server.sockets.adapter.rooms[room.roomId]?.length || 0;
    socket.to(room.roomId).emit('room-update', { room });
    session.room = null;
  }
};

export default function createSocketServer(httpServer) {
  const server = socketio(httpServer);

  server.on('connection', (socket) => {
    let session = { room: null };

    socket.on('create-room', (params, callback) => createRoom(params, callback, session, socket, server));
    socket.on('join-room', (params, callback) => joinRoom(params, callback, session, socket, server));
    socket.on('add-emotion', (params, callback) => addEmotion(params, callback, session, socket, server));
    socket.on('remove-emotion', (params, callback) => removeEmotion(params, callback, session, socket, server));
    socket.on('send-emotion', (params, callback) => sendEmotion(params, callback, session, socket, server));

    socket.on('disconnect', (reason: string) => {
      leaveRoom(session, socket, server);
      session = null;
    });
  });

  return server;
}
