import { LANGUAGE_TYPE, SLICE_NAME } from '@config/type';
import { CommonState, SupportInfo, TransferType } from '@model/app';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: CommonState = {
  showIntructionInHome: false,
  showIntro: false,
  language: LANGUAGE_TYPE.vi,
  scanQrBefore: false,
  loginTransferType: '',
  enableInstruction: true, // disable show instruction at home screen
  hotline: '1900555592', // set mặc định hotline ban đầu
  email: '',
  hotlineVIP: '',
};

const commonSlice = createSlice({
  name: SLICE_NAME.COMMON,
  initialState: initialState,
  reducers: {
    showIntructionInHome: (state, { payload }: PayloadAction<boolean>) => {
      state.showIntructionInHome = payload;
    },
    setShowInfo: (state) => {
      state.showIntro = true;
    },
    setLanguage: (state, { payload }: PayloadAction<string>) => {
      state.language = payload;
    },
    setScanQRbefore: (state, { payload }: PayloadAction<boolean>) => {
      state.scanQrBefore = payload;
      state.loginTransferType = '';
    },
    setTransferLogin: (state, { payload }: PayloadAction<TransferType>) => {
      state.loginTransferType = payload;
      state.scanQrBefore = false;
    },
    enableShowInstruction: (state, { payload }: PayloadAction<boolean>) => {
      state.enableInstruction = payload;
    },
    reset: (state) => {
      state.scanQrBefore = false;
    },
    setSupport: (state, { payload }: PayloadAction<SupportInfo>) => {
      payload.email && (state.email = payload.email);
      payload.hotline && (state.hotline = payload.hotline);
      payload.hotlineVIP && (state.hotlineVIP = payload.hotlineVIP);
    },
  },
});
export const { reducer: commonReducer, actions: commonActions } = commonSlice;
