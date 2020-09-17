import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Room, JoinRoom, AddEmotion, RemoveEmotion, SendEmotion } from 'shared/api-interfaces';
import api from '../lib/api';

const createRoom = createAsyncThunk<Room>(
  'createRoom',
  async (): Promise<Room> => {
    const res = await api.createRoom();
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

const sendEmotion = createAsyncThunk<Room, SendEmotion.RequestParam>(
  'sendEmotion',
  async (req: SendEmotion.RequestParam): Promise<Room> => {
    const res = await api.sendEmotion(req);
    return res.room;
  }
);

export { createRoom, joinRoom, addEmotion, removeEmotion, sendEmotion };

interface RoomState extends Room {
  error: string | null;
}

const slice = createSlice({
  name: 'room',
  initialState: null,
  reducers: {
    updateRoom: (state: RoomState, action: PayloadAction<Room>) => {
      return { ...state, ...action.payload };
    },
    raiseRoomError: (state: RoomState, action: PayloadAction<string | null>) => {
      return { ...state, error: action.payload };
    },
  },
  extraReducers: (builder) => {
    [createRoom, joinRoom, addEmotion, removeEmotion, sendEmotion].forEach((thunk) => {
      builder.addCase(thunk.fulfilled, (state: RoomState, action: PayloadAction<Room>) => {
        return { error: null, ...action.payload };
      });
      builder.addCase(thunk.rejected, (state: RoomState, action) => {
        return { ...state, error: action.error.message };
      });
    });
  },
});

export const { updateRoom, raiseRoomError } = slice.actions;

export default slice.reducer;
