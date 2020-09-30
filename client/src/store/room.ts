import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room, Emotion, CreateRoom, JoinRoom, AddEmotion, RemoveEmotion, SendEmotion } from 'shared/api-interfaces';
import api from '../lib/api';

const createRoom = createAsyncThunk<Room, CreateRoom.RequestParam>(
  'createRoom',
  async (req: CreateRoom.RequestParam): Promise<Room> => {
    const res = await api.createRoom(req);
    return res.room;
  }
);

const joinRoom = createAsyncThunk<Room, JoinRoom.RequestParam>(
  'joinRoom',
  async (req: JoinRoom.RequestParam): Promise<Room> => {
    const res = await api.joinRoom(req);
    return res.room;
  }
);

const addEmotion = createAsyncThunk<Room, AddEmotion.RequestParam>(
  'addEmotion',
  async (req: AddEmotion.RequestParam): Promise<Room> => {
    const res = await api.addEmotion(req);
    return res.room;
  }
);

const removeEmotion = createAsyncThunk<Room, RemoveEmotion.RequestParam>(
  'removeEmotion',
  async (req: RemoveEmotion.RequestParam): Promise<Room> => {
    const res = await api.removeEmotion(req);
    return res.room;
  }
);

const sendEmotion = createAsyncThunk<Emotion, SendEmotion.RequestParam>(
  'sendEmotion',
  async (req: SendEmotion.RequestParam): Promise<Emotion> => {
    const res = await api.sendEmotion(req);
    return res.emotion;
  }
);

export { createRoom, joinRoom, addEmotion, removeEmotion, sendEmotion };

interface RoomState extends Room {
  error: string | null;
}

const cloneRoomStateWithNewEmotion = (roomState: RoomState, newEmotion: Emotion): Room => {
  const emotions = roomState.emotions.map((emotion) =>
    emotion.emotionId === newEmotion.emotionId ? newEmotion : { ...emotion }
  );
  return { ...roomState, emotions };
};

const slice = createSlice({
  name: 'room',
  initialState: null,
  reducers: {
    updateRoom: (state: RoomState, action: PayloadAction<Room>) => {
      return { ...state, ...action.payload };
    },
    updateEmotion: (state: RoomState, action: PayloadAction<Emotion>) => {
      return cloneRoomStateWithNewEmotion(state, action.payload);
    },
    raiseRoomError: (state: RoomState, action: PayloadAction<string | null>) => {
      return { ...state, error: action.payload };
    },
  },
  extraReducers: (builder) => {
    [createRoom, joinRoom, addEmotion, removeEmotion].forEach((thunk) => {
      builder.addCase(thunk.fulfilled, (state: RoomState, action: PayloadAction<Room>) => {
        return { error: null, ...action.payload };
      });
      builder.addCase(thunk.rejected, (state: RoomState, action) => {
        return { ...state, error: action.error.message };
      });
    });

    [sendEmotion].forEach((thunk) => {
      builder.addCase(thunk.fulfilled, (state: RoomState, action: PayloadAction<Emotion>) => {
        return {
          ...cloneRoomStateWithNewEmotion(state, action.payload),
          error: null,
        };
      });
      builder.addCase(thunk.rejected, (state: RoomState, action) => {
        return { ...state, error: action.error.message };
      });
    });
  },
});

export const { updateRoom, updateEmotion, raiseRoomError } = slice.actions;

export default slice.reducer;
