export interface Emotion {
  emotionId: string;
  createdBy: string | null;
  label: string;
  soundUrl: string;
  total: number;
  fever: number;
  feverEndAt: number;
  feverSoundUrl: string | null;
}

export interface Room {
  roomId: string;
  createdAt: number;
  numberOfActiveConnections: number;
  emotions: Emotion[];
}

interface ResponseParamBase {
  error: 'InvalidParameter' | 'NotAllowed' | 'NoRoomFound' | 'NoEmotionFound' | 'UnexpectedError' | null;
  room?: Room;
}

export namespace CreateRoom {
  //export const evnetName: string = 'create-room';
  export type ResponseParam = ResponseParamBase;
}

export namespace JoinRoom {
  //export const evnetName: string = 'join-room';

  export interface RequestParam {
    roomId: string;
  }

  export type ResponseParam = ResponseParamBase;
}

export namespace AddEmotion {
  //export const evnetName: string = 'add-emotion';

  export interface RequestParam {
    label: string;
    soundUrl: string;
    feverSoundUrl: string | null;
  }

  export type ResponseParam = ResponseParamBase;
}

export namespace RemoveEmotion {
  //export const evnetName: string = 'remove-emotion';

  export interface RequestParam {
    emotionId: string;
  }

  export type ResponseParam = ResponseParamBase;
}

export namespace SendEmotion {
  //export const evnetName: string = 'send-emotion';

  export interface RequestParam {
    emotionId: string;
  }

  export type ResponseParam = ResponseParamBase;
}

export namespace RoomUpdate {
  //export const evnetName: string = 'room-update';

  export interface NotifyParam {
    room: Room;
  }
}
