import { createSlice } from '@reduxjs/toolkit';

export const errSlice = createSlice({
  name: 'err',
  initialState: {
    err: null,
  },
  reducers: {
    seterrs: (state, action) => {
      state.err = action.payload;
    },
  },
});

export const { seterrs } = errSlice.actions;

export const selecterr = (state) => state.err.err;

export default errSlice.reducer;