import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mute: true,
};

const slice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    mute: (state) => {
      return { ...state, mute: true };
    },
    unmute: (state) => {
      return { ...state, mute: false };
    },
  },
});

export const { mute, unmute } = slice.actions;

export default slice.reducer;
