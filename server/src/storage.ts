import { MongoClient } from 'mongodb';
import { Room } from 'shared/api-interfaces';

const pending = new Map<string, NodeJS.Timeout>();
const clientReady = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true }).connect();

export function saveRoom(room: Room): void {
  if (pending.has(room.roomId)) {
    clearTimeout(pending.get(room.roomId));
  }
  const timer = setTimeout(async () => {
    const client = await clientReady;
    pending.delete(room.roomId);
    client.db('heeapp').collection('rooms').findOneAndReplace({ _id: room.roomId }, room, { upsert: true });
  }, 10000);
  pending.set(room.roomId, timer as NodeJS.Timeout);
}

export async function restoreRoom(roomId: string): Promise<Room> {
  const client = await clientReady;
  const result = await client.db('heeapp').collection('rooms').findOne({ _id: roomId });
  return result;
}
