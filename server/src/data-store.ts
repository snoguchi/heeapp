import { MongoClient } from 'mongodb';
import { Room, Emotion } from 'shared/api-interfaces';

class Lazy {
  private pending: Map<string, NodeJS.Timeout>;

  constructor() {
    this.pending = new Map();
  }

  throttle(id, interval, fn) {
    if (this.pending.has(id)) {
      clearTimeout(this.pending.get(id));
    }

    const timer = setTimeout(async () => {
      this.pending.delete(id);
      fn();
    }, interval);

    this.pending.set(id, timer as NodeJS.Timeout);
  }
}

export interface DataStore {
  addRoom(room: Room): Promise<Room>;
  getRoom(roomId: string): Promise<Room>;
  updateRoom(room: Room): Promise<Room>;
}

export class MongoDataStore implements DataStore {
  private clientPromise: Promise<MongoClient>;

  constructor(uri: string = process.env.MONGODB_URI) {
    this.clientPromise = new MongoClient(uri, { useNewUrlParser: true }).connect();
  }

  async addRoom(room: Room): Promise<Room> {
    const client = await this.clientPromise;
    await client
      .db('heeapp')
      .collection('rooms')
      .insertOne({ ...room, _id: room.roomId });
    return room;
  }

  async getRoom(roomId: string): Promise<Room> {
    const client = await this.clientPromise;
    const room: Room = await client
      .db('heeapp')
      .collection('rooms')
      .findOne({ _id: roomId }, { projection: { _id: 0 } });
    return room || null;
  }

  async updateRoom(room: Room): Promise<Room> {
    const client = await this.clientPromise;
    await client.db('heeapp').collection('rooms').findOneAndReplace({ _id: room.roomId }, room);
    return room;
  }
}

export class CachedDataStore implements DataStore {
  private cache: Map<string, Room>;
  private lazy: Lazy;

  constructor(private inner: DataStore) {
    this.cache = new Map();
    this.lazy = new Lazy();
  }

  async addRoom(room: Room): Promise<Room> {
    this.cache.set(room.roomId, room);

    return this.inner.addRoom(room);
  }

  async getRoom(roomId: string): Promise<Room> {
    if (this.cache.has(roomId)) {
      return this.cache.get(roomId);
    }

    const room: Room = await this.inner.getRoom(roomId);

    this.cache.set(roomId, room);

    return room;
  }

  async updateRoom(room: Room): Promise<Room> {
    this.cache.set(room.roomId, room);

    return this.inner.updateRoom(room);
  }

  lazyUpdateRoom(room: Room, interval: number): Room {
    this.cache.set(room.roomId, room);
    this.lazy.throttle(room.roomId, interval, () => {
      this.inner.updateRoom(this.cache.get(room.roomId));
    });
    return room;
  }
}

export function getDefaultDataStore(): CachedDataStore {
  return new CachedDataStore(new MongoDataStore());
}
