import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from './baseApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;