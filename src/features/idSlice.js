import { createSlice } from '@reduxjs/toolkit';
const getid = localStorage.getItem('user_id')

export const idSlice = createSlice({
  name: 'id',
  initialState: {
    id: getid || null,
  },
  reducers: {
    setids: (state, action) => {
      state.id = action.payload;
      localStorage.setItem('user_id', action.payload.id)
    },
  },
});

export const { setids } = idSlice.actions;

export const selectid = (state) => state.id.id;

export default idSlice.reducer;