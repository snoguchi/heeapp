const { nanoid } = require('nanoid');
const socketio = require('socket.io');
import { Room, CreateRoom, JoinRoom, AddEmotion, SendEmotion, RemoveEmotion } from 'shared/api-interfaces';
import defaultEmotions from './default-emotions';
import { saveRoom, restoreRoom } from './storage';

type Callback<T> = (response: T) => void;

const roomMap = new Map<string, Room>();

export default function createSocketServer(server) {
  const io = socketio(server);

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
        numberOfActiveConnections: 0,
        emotions: defaultEmotions(),
      };

      roomMap.set(roomId, room);
      console.log(`room ${roomId} created`);
      socket.join(roomId, () => {
        room.numberOfActiveConnections = io.sockets.adapter.rooms[room.roomId].length;
        callback({ error: null, room });
        saveRoom(room);
      });
    });

    socket.on('join-room', async (param: JoinRoom.RequestParam, callback: Callback<JoinRoom.ResponseParam>) => {
      const { roomId } = param;

      if (!roomId) {
        return callback({ error: 'InvalidParameter' });
      }

      if (room !== null) {
        return callback({ error: 'NotAllowed' });
      }

      if (roomMap.has(roomId)) {
        room = roomMap.get(roomId);
      } else {
        console.time('restoreRoom');
        room = await restoreRoom(roomId);
        console.timeEnd('restoreRoom');
        if (room) {
          roomMap.set(roomId, room);
        } else {
          return callback({ error: 'NoRoomFound' });
        }
      }

      socket.join(roomId, () => {
        room.numberOfActiveConnections = io.sockets.adapter.rooms[room.roomId].length;
        callback({ error: null, room });
        socket.to(roomId).emit('room-update', { room });
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
        count: 0,
        feverCount: 0,
        feverEndAt: 0,
        feverSoundUrl,
      });

      room.numberOfActiveConnections = io.sockets.adapter.rooms[room.roomId].length;

      callback({ error: null, room });
      socket.to(room.roomId).emit('room-update', { room });
      saveRoom(room);
    });

    socket.on(
      'remove-emotion',
      (param: RemoveEmotion.RequestParam, callback: Callback<RemoveEmotion.ResponseParam>) => {
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
        /*
        if (emotion.createdBy !== socket.id) {
          return callback({ error: 'NotAllowed' });
        }
        */
        room.emotions = room.emotions.filter((emotion) => emotion.emotionId !== emotionId);
        room.numberOfActiveConnections = io.sockets.adapter.rooms[room.roomId].length;

        callback({ error: null, room });
        socket.to(room.roomId).emit('room-update', { room });
        saveRoom(room);
      }
    );

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

      emotion.count++;

      const now = Date.now();
      if (now >= emotion.feverEndAt) {
        emotion.feverCount = 1;
      } else {
        emotion.feverCount++;
      }
      emotion.feverEndAt = now + 10 * 1000;

      room.numberOfActiveConnections = io.sockets.adapter.rooms[room.roomId].length;

      callback({ error: null, emotion });
      socket.to(room.roomId).emit('emotion-update', { emotion });
      saveRoom(room);
    });

    socket.on('disconnect', (reason: string) => {
      if (room) {
        room.numberOfActiveConnections = io.sockets.adapter.rooms[room.roomId].length;
        socket.to(room.roomId).emit('room-update', { room });
        room = null;
      }
    });
  });

  return io;
}
