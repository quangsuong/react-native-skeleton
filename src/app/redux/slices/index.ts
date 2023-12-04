import {combineReducers} from 'redux';

import authReducer from './auth';
import appReducer from './app';
export * from './auth';
export * from './app';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
