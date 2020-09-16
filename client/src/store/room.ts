import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Room, JoinRoom, AddEmotion, RemoveEmotion, SendEmotion } from 'shared/api-interfaces';
import api from './api';

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

const slice = createSlice({
  name: 'room',
  initialState: null,
  reducers: {
    update: (state, action: { payload: Room }) => {
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
    builder.addCase(addEmotion.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(removeEmotion.fulfilled, (state, action) => {
      return { ...action.payload };
    });
    builder.addCase(sendEmotion.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export const { update } = slice.actions;

export default slice.reducer;
