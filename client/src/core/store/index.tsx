import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { NODE_ENV_MODE } from 'mono-utils-core/lib/src/enum';

const reducers = combineReducers<any>({});

export const store = configureStore({
      reducer: reducers,
      devTools: process.env.NODE_ENV !== NODE_ENV_MODE.PRODUCTION,
});
