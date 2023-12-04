/* eslint-disable @typescript-eslint/no-explicit-any */
import { SLICE_NAME } from '@config/type';
import * as Action from '@redux-action-type/others';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DownloadProgress } from 'react-native-code-push';

export enum SttForcecUpdateApp {
  NO_UPDATE = 'NO_UPDATE',
  NO_REQUIRED = 'NO_REQUIRED',
  REQUIRED = 'REQUIRED',
  INIT = 'INIT',
}

type OtherType = {
  processSync: DownloadProgress;
  statusUpdateApp: number;
  sttForcecUpdateApp: SttForcecUpdateApp;
  isUserLoggedOut: boolean;
  disabledRestartApp: boolean;
  nameScreenWillShow?: string;
  showMascot?: boolean;
  turnOffMascot?: boolean;
};

const initialState: OtherType = {
  processSync: {
    receivedBytes: 0,
    totalBytes: 0,
  },
  statusUpdateApp: 0,
  sttForcecUpdateApp: SttForcecUpdateApp.INIT,
  nameScreenWillShow: '',
  isUserLoggedOut: false,
  disabledRestartApp: false,
  showMascot: false,
  turnOffMascot: false,
};
const OthersSlice = createSlice({
  name: SLICE_NAME.OTHERS,
  initialState: initialState,
  reducers: {
    setStatusSyncCodepush: (state, { payload }: PayloadAction<DownloadProgress>) => {
      state.processSync = payload;
    },
    setStatusUpdateApp: (state, { payload }: PayloadAction<any>) => {
      state.statusUpdateApp = payload;
    },
    setSttForceUpdateApp: (state, { payload }: PayloadAction<SttForcecUpdateApp>) => {
      state.sttForcecUpdateApp = payload;
    },
    resetCodePushState: (state) => {
      state = initialState;
    },
    setShowMascot: (state, { payload }: PayloadAction<boolean>) => {
      if (!state.turnOffMascot) {
        state.showMascot = payload;
      }
    },
    setTurnOffMascot: (state, { payload }: PayloadAction<boolean>) => {
      state.showMascot = false;
      state.turnOffMascot = payload;
    },
  },
});

const syncCodePush = createAction(Action.SYNC_CODE_PUSH);
const restartApp = createAction(Action.RESTART_APP);
const showAlert = createAction(Action.SHOW_ALERT);
const checkUpdateCodePush = createAction(
  Action.CHECK_UPDATE_CODE_PUSH,
  (onNoUpdate?: () => void) => ({
    payload: { onNoUpdate },
  })
);

export const OthersActions = {
  ...OthersSlice.actions,
  syncCodePush,
  restartApp,
  showAlert,
  checkUpdateCodePush,
};
export const OthersReducer = OthersSlice.reducer;
