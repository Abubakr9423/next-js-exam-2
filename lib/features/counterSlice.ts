import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0, data: [], datainfo: null },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    reset: (state) => { state.value = 0 },
  },
});

export const { increment, decrement, reset } = counterSlice.actions;

export const counterReducer = counterSlice.reducer;