import { ResultBase, SLICE_NAME } from '@config/type';
import { AuthenticationState } from '@model/authentication';
import * as Action from '@redux-action-type/authentication';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthenticationState = {
  loading: false,
  sessionId: undefined,
  tempSessionId: undefined,
  isUserLoggedOut: false,
};
const authenticationSlice = createSlice({
  name: SLICE_NAME.AUTHENTICATION,
  initialState: initialState,
  reducers: {
    setSessionId: (state, { payload }: PayloadAction<string>) => {
      state.sessionId = payload;
    },
    // logout: state => {
    //   state.sessionId = undefined;
    // },
    switchAccount: (state) => {
      state.sessionId = undefined;
    },
    reset: () => initialState,
    setTempSessionId: (state, { payload }: PayloadAction<string>) => {
      state.tempSessionId = payload;
    },
    getSessionIdFormTempSessionId: (state) => {
      state.sessionId = state.tempSessionId;
      state.tempSessionId = undefined;
    },
    setUserLoggedOut: (state, { payload }: PayloadAction<boolean>) => {
      state.isUserLoggedOut = payload;
    },
  },
});

const login = createAction(
  Action.LOGIN,
  (body: any, onSucceeded: (data: any) => void, onFailure: (data: ResultBase) => void) => ({
    payload: {
      body,
      onSucceeded,
      onFailure,
    },
  })
);

const logout = createAction(Action.LOGOUT, () => ({
  payload: {},
}));

const clearSession = createAction(Action.CLEAR_SESSION, () => ({
  payload: {},
}));

export const authenticationActions = {
  ...authenticationSlice.actions,
  login,
  logout,
  clearSession,
};
export const authenticationReducer = authenticationSlice.reducer;
