import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    categories: [],
    services: {},
  },
  reducers: {
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload);
        state.services[action.payload] = [];
      }
    },
    addService: (state, action) => {
      const { category, service } = action.payload;
      if (state.categories.includes(category)) {
        state.services[category].push(service);
      }
    },
  },
});

export const { addCategory, addService } = adminSlice.actions;
export default adminSlice.reducer;
