import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';


const persistConfig = {
  key:'root',
  version:1,
  storage
}

const reducer = combineReducers({
  player: playerReducer,
})
const persistedReducer = persistReducer(persistConfig,reducer);

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]:shazamCoreApi.reducer,
    persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware)
});
