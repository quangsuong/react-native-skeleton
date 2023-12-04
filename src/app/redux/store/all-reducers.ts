import { accountReducer, appReducer, authenticationReducer, commonReducer } from '@redux-slice';
import { combineReducers } from '@reduxjs/toolkit';
import { OthersReducer } from '../action-slice/others';

export const allReducer = combineReducers({
  app: appReducer,
  authentication: authenticationReducer,
  infoAccount: accountReducer,
  common: commonReducer,
  others: OthersReducer,
});

export type RootState = ReturnType<typeof allReducer>;
