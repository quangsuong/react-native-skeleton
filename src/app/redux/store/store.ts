import { subscribeActionMiddleware } from '@common';
import { configureStore } from '@reduxjs/toolkit';
import { allReducer } from '@store/all-reducers';
import { reduxPersistStorage } from '@utils/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { listenerMiddleware } from '../listener';

const devMode = __DEV__;

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: reduxPersistStorage,
    whitelist: ['app', 'common', 'infoAccount'],
  },
  allReducer
);

const middlewares = [subscribeActionMiddleware];
if (devMode) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: persistedReducer,
  devTools: devMode,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .prepend(listenerMiddleware.middleware)
      .concat(middlewares),
});
export const persistor = persistStore(store);
