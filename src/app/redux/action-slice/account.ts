import { SLICE_NAME } from '@config/type';
import { CustomerAccount, InfoAccountWrap } from '@model/account';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum SmartOtpStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OTHERS = 'OTHERS',
  UN_REGISTER = 'UN_REGISTER',
}

const initialState: InfoAccountWrap = {
  infoAccount: {
    customer: {},
    defaultAccount: '',
    isPriorityCustomer: false,
  },
};

const accountSlice = createSlice({
  name: SLICE_NAME.ACCOUNT,
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setCustomer: (state, { payload }: PayloadAction<CustomerAccount>) => {
      state.infoAccount.customer = payload;
    },
  },
});

export const accountAction = {
  ...accountSlice.actions,
};

export const accountReducer = accountSlice.reducer;
