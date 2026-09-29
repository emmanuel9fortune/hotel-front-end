import { configureStore } from '@reduxjs/toolkit';
import idReducer from '../features/idSlice';
import errReducer from '../features/errSlice';
import infoReducer from '../features/infoSlice';
import reloadReducer from '../features/reloadSlice';

export const store = configureStore({
  reducer: {
    id: idReducer,
    err: errReducer,
    info: infoReducer,
    reload: reloadReducer,
  },
});