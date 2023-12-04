import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '.';

interface AuthInfo {
  access_token: string;
  expires_at: Date;
}

interface AuthState {
  auth: AuthInfo | null;
  tokenDevice: string;
}

const initialState: AuthState = {
  auth: null,
  tokenDevice: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: () => {
      //clear token
      return initialState;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const {logout} = authSlice.actions;

export default authSlice.reducer;
