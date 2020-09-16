import * as io from 'socket.io-client';
import { CreateRoom, JoinRoom, AddEmotion, RemoveEmotion, SendEmotion, RoomUpdate } from 'shared/api-interfaces';

class SocketClient {
  private socket;
  constructor() {
    this.socket = io();
  }
  get clientId() {
    return this.socket.id;
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
  async createRoom(): Promise<CreateRoom.ResponseParam> {
    return this.emit<CreateRoom.ResponseParam>('create-room');
  }
  async joinRoom(req: JoinRoom.RequestParam): Promise<JoinRoom.ResponseParam> {
    return this.emit<JoinRoom.ResponseParam>('join-room', req);
  }
  async addEmotion(req: AddEmotion.RequestParam): Promise<AddEmotion.ResponseParam> {
    return this.emit<AddEmotion.ResponseParam>('add-emotion', req);
  }
  async removeEmotion(req: RemoveEmotion.RequestParam): Promise<RemoveEmotion.ResponseParam> {
    return this.emit<RemoveEmotion.ResponseParam>('remove-emotion', req);
  }
  async sendEmotion(req: SendEmotion.RequestParam): Promise<SendEmotion.ResponseParam> {
    return this.emit<SendEmotion.ResponseParam>('send-emotion', req);
  }
  onRoomUpdate(listener: (room: RoomUpdate.NotifyParam) => void) {
    this.socket.on('room-update', listener);
  }
  onDisconnect(listener: (reason: string) => void) {
    this.socket.on('disconnect', listener);
  }
}

export default new SocketClient();
