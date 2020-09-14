import * as io from 'socket.io-client';
import { Room, JoinRoomRequest, SendEmotionRequest, RoomResponse } from 'shared/api-interfaces';

class SocketClient {
  private socket;
  constructor() {
    this.socket = io();
  }
  private async emit<T>(...args): Promise<T> {
    return new Promise((resolve, reject) => {
      this.socket.emit(...args, (response) => {
        if (response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  }
  async createRoom(): Promise<RoomResponse> {
    return this.emit<RoomResponse>('create');
  }
  async joinRoom(req: JoinRoomRequest): Promise<RoomResponse> {
    return this.emit<RoomResponse>('join', req);
  }
  async leaveRoom(): Promise<RoomResponse> {
    return this.emit<RoomResponse>('leave');
  }
  async emotion(req: SendEmotionRequest): Promise<RoomResponse> {
    return this.emit<RoomResponse>('emotion', req);
  }
  onUpdate(listener: (room: Room) => void) {
    this.socket.on('update', listener);
  }
}

export default new SocketClient();
