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
  emotions: Emotion[];
  numberOfActiveConnections: number;
}

interface ResponseParamBase {
  error: 'InvalidParameter' | 'NotAllowed' | 'NoRoomFound' | 'NoEmotionFound' | 'UnexpectedError' | null;
}

export namespace CreateRoom {
  //export const evnetName: string = 'create-room';
  export interface ResponseParam extends ResponseParamBase {
    room?: Room;
  }
}

export namespace JoinRoom {
  //export const evnetName: string = 'join-room';

  export interface RequestParam {
    roomId: string;
  }

  export interface ResponseParam extends ResponseParamBase {
    room?: Room;
  }
}

export namespace AddEmotion {
  //export const evnetName: string = 'add-emotion';

  export interface RequestParam {
    label: string;
    soundUrl: string;
    feverSoundUrl: string | null;
  }

  export interface ResponseParam extends ResponseParamBase {
    room?: Room;
  }
}

export namespace RemoveEmotion {
  //export const evnetName: string = 'remove-emotion';

  export interface RequestParam {
    emotionId: string;
  }

  export interface ResponseParam extends ResponseParamBase {
    room?: Room;
  }
}

export namespace SendEmotion {
  //export const evnetName: string = 'send-emotion';

  export interface RequestParam {
    emotionId: string;
  }

  export interface ResponseParam extends ResponseParamBase {
    emotion?: Emotion;
  }
}

export namespace RoomUpdate {
  //export const evnetName: string = 'room-update';

  export interface NotifyParam {
    room: Room;
  }
}

export namespace EmotionUpdate {
  //export const evnetName: string = 'emotion-update';

  export interface NotifyParam {
    emotion: Emotion;
  }
}
