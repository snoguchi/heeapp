import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Lang = 'ja' | 'en';

export interface Config {
  isMute: boolean;
  lang: Lang;
}

const initialState = {
  isMute: true,
  lang: 'ja',
};

const slice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    mute: (state) => {
      state.isMute = true;
    },
    unmute: (state) => {
      state.isMute = false;
    },
    setLang: (state: Config, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
    },
  },
});

export const { mute, unmute, setLang } = slice.actions;

export default slice.reducer;
