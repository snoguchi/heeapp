import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Room, JoinRoomRequest, SendEmotionRequest } from 'shared/api-interfaces';
import api from './api';

const createRoom = createAsyncThunk<Room>(
  'createRoom',
  async (): Promise<Room> => {
    const res = await api.createRoom();
    return res.room;
  }
);

const joinRoom = createAsyncThunk<Room, JoinRoomRequest>(
  'joinRoom',
  async (req: JoinRoomRequest): Promise<Room> => {
    const res = await api.joinRoom(req);
    return res.room;
  }
);

const leaveRoom = createAsyncThunk<Room>(
  'leaveRoom',
  async (): Promise<Room> => {
    const res = await api.leaveRoom();
    return res.room;
  }
);

const sendEmotion = createAsyncThunk<Room, SendEmotionRequest>(
  'emotion',
  async (req: SendEmotionRequest): Promise<Room> => {
    const res = await api.emotion(req);
    return res.room;
  }
);

export { createRoom, joinRoom, leaveRoom, sendEmotion };

const slice = createSlice({
  name: 'room',
  initialState: null,
  reducers: {
    update: (state, action) => {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createRoom.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(joinRoom.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(leaveRoom.fulfilled, (state, action) => {
      return null;
    });
    builder.addCase(sendEmotion.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export const { update } = slice.actions;

export default slice.reducer;
