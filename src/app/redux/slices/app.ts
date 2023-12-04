import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

interface AppState {
  count: number;
}

const initialState: AppState = {
  count: 0,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      state.count -= 1;
    },
  },
});

export const selectApp = (state: RootState) => state.app;

export const {increment, decrement} = appSlice.actions;

export default appSlice.reducer;
