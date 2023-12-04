import { SLICE_NAME } from '@config/type';
import { AppState } from '@model/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeType } from '@theme';
import { RemotePackage } from 'react-native-code-push';

const initialAppState: AppState = {
  internetState: true,
  loadingApp: false,
  showDialog: false,
  theme: 'default',
  notificationCount: 0,
  hideAmount: false,
  notificationToken: undefined,
  deviceLoading: true,
  sotpActived: false,
  sotpRegistered: false,
  sotpBiometric: false,
  numberOfSignin: 0,
  codePushVersion: undefined,
};

const appSlice = createSlice({
  name: SLICE_NAME.APP,
  initialState: initialAppState,
  reducers: {
    setInternetState: (state, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload;
    },
    setAppTheme: (state, { payload }: PayloadAction<ThemeType>) => {
      state.theme = payload;
    },
    startLoadApp: (state) => {
      state.loadingApp = true;
    },
    endLoadApp: (state) => {
      state.loadingApp = false;
    },
    startProcess: (state) => {
      state.showDialog = true;
    },
    endProcess: (state) => {
      state.showDialog = false;
    },
    setNotificationCount: (state, { payload }: PayloadAction<number>) => {
      state.notificationCount = payload;
    },
    setNotificationToken: (state, { payload }: PayloadAction<string>) => {
      state.notificationToken = payload;
    },
    reset: (state) => {
      state.sotpBiometric = false;
      state.numberOfSignin = 0;
      state.deviceLoading = true;
    },
    setCodePushVersion: (state, { payload }: PayloadAction<RemotePackage>) => {
      state.codePushVersion = payload;
    },
  },
});
export const { reducer: appReducer, actions: appActions } = appSlice;
