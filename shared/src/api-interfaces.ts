export interface Emotion {
  emotionId: string;
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
}

export interface JoinRoomRequest {
  roomId: string;
}

export interface SendEmotionRequest {
  emotionId: string;
}

export interface RoomResponse {
  error: string | null;
  room?: Room;
}
