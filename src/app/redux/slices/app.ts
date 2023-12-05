import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';
import { LANGUAGE_TYPE } from '@config/type';
import { ThemeType } from '@theme';

interface AppState {
  count: number;
  language: LANGUAGE_TYPE;
  loadingApp: boolean;
  theme: ThemeType
}

const initialState: AppState = {
  count: 0,
  language: LANGUAGE_TYPE.vi,
  loadingApp: false,
  theme: 'default',
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<LANGUAGE_TYPE>) => {
      state.language = payload;
    },
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
  },
});

export const selectApp = (state: RootState) => state.app;
export const selectLanguage = (state: RootState) => state.app.language;

export const {increment, decrement, setLanguage} = appSlice.actions;

export default appSlice.reducer;
