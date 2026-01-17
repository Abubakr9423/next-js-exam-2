import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '../features/counterSlice'; // <-- named import
import { todoApi } from '../features/api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;