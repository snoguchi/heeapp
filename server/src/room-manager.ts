const { nanoid } = require('nanoid');
import { MongoClient } from 'mongodb';
import { Room } from 'shared/api-interfaces';
import defaultEmotions from './default-emotions';

const clientReady = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true }).connect();
const roomCache = new Map<string, Room>();

const pending = new Map<string, NodeJS.Timeout>();
function throttle(id, interval, fn) {
  if (pending.has(id)) {
    clearTimeout(pending.get(id));
  }

  const timer = setTimeout(async () => {
    pending.delete(id);
    fn();
  }, interval);

  pending.set(id, timer as NodeJS.Timeout);
}

export async function createRoom(): Promise<Room> {
  const roomId = nanoid();

  const room: Room = {
    roomId,
    createdAt: Date.now(),
    emotions: defaultEmotions(),
    numberOfActiveConnections: 0,
  };

  const client = await clientReady;

  await client
    .db('heeapp')
    .collection('rooms')
    .insertOne({ ...room, _id: roomId });

  roomCache.set(roomId, room);

  return room;
}

export async function restoreRoom(roomId: string): Promise<Room> {
  if (roomCache.has(roomId)) {
    return roomCache.get(roomId);
  }

  const client = await clientReady;

  const room = await client
    .db('heeapp')
    .collection('rooms')
    .findOne({ _id: roomId }, { projection: { _id: 0 } });

  if (!room) {
    return null;
  }

  roomCache.set(roomId, room);

  return room;
}

export async function updateRoom(room: Room, interval: number = 0): Promise<Room> {
  roomCache.set(room.roomId, room);

  throttle(room.roomId, interval, async () => {
    const client = await clientReady;
    client.db('heeapp').collection('rooms').findOneAndReplace({ _id: room.roomId }, room);
  });

  return room;
}
