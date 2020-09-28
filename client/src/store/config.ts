import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMute: true,
};

const slice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    mute: (state) => {
      return { ...state, isMute: true };
    },
    unmute: (state) => {
      return { ...state, isMute: false };
    },
  },
});

export const { mute, unmute } = slice.actions;

export default slice.reducer;
