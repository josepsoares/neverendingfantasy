import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { ffxivApi } from '@services/api/ffxivApi';
import { ffxivCollectApi } from '@services/api/ffxivCollectApi';
import { tripleTriadApi } from '@services/api/tripleTriadApi';
import { lodestoneApi } from '@services/api/lodestoneApi';
import { rawgApi } from '@services/api/rawgApi';

const initialState = {};

export const makeStore = (preloadedState = initialState) =>
  configureStore({
    reducer: {
      [ffxivApi.reducerPath]: ffxivApi.reducer,
      [ffxivCollectApi.reducerPath]: ffxivCollectApi.reducer,
      [tripleTriadApi.reducerPath]: tripleTriadApi.reducer,
      [lodestoneApi.reducerPath]: lodestoneApi.reducer,
      [rawgApi.reducerPath]: rawgApi.reducer
    },
    preloadedState,
    middleware: defaultMiddleware =>
      defaultMiddleware().concat(
        ffxivApi.middleware,
        ffxivCollectApi.middleware,
        tripleTriadApi.middleware,
        lodestoneApi.middleware,
        rawgApi.middleware
      )
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const store = createWrapper<AppStore>(makeStore, { debug: true });
