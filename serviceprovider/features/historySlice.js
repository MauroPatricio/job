import { createSlice, configureStore, createSelector } from '@reduxjs/toolkit';
import { Alert } from 'react-native';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    services: [],
    bookings: [],
  },
  reducers: {
    addServiceToHistory: (state, action) => {
      state.services.push(action.payload);
    },
    addBookingToHistory: (state, action) => {
      state.bookings.push(action.payload);
    },
    removeServiceFromHistory: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
    },
    removeBookingFromHistory: (state, action) => {
      state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
    },
    clearHistory: (state) => {
      state.services = [];
      state.bookings = [];
    },
  },
});

export const {
  addServiceToHistory,
  addBookingToHistory,
  removeServiceFromHistory,
  removeBookingFromHistory,
  clearHistory,
} = historySlice.actions;

// Selectors
export const selectHistory = (state) => state.history;
export const selectServices = createSelector(selectHistory, (history) => history.services);
export const selectBookings = createSelector(selectHistory, (history) => history.bookings);

export default historySlice.reducer;

// Configuração da store
const store = configureStore({
  reducer: { history: historySlice.reducer },
});

export { store };
