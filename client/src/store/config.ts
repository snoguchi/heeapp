import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Lang = 'ja' | 'en';

export interface Config {
  isMute: boolean;
  lang: Lang;
}

const defaultLanguage = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;

const initialState = {
  isMute: true,
  lang: defaultLanguage === 'ja' ? 'ja' : 'en',
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
