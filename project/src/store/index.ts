import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import reducer from './reducer';

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    thunk: {
      extraArgument: api
    }
  })
});
