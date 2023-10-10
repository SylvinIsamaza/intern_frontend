import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  transactions: null,
  error: null,
};
const transactionSlice = createSlice({
  name: "transactionReducer",
  initialState,
  reducers: {
    loadTransactionStart: (state) => {
      state.loading = true;
    },
    loadTransactionSuccess: (state, action) => {
      state.loading = false;
    
      state.transactions = action.payload;
    },
    loadTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  updateTransactionStart: (state) => {
      state.loading = true;
    },
    updateTransactionSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.transactions = action.payload;
    },
    updateTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTransactionStart: (state) => {
      state.loading = true;
    },
    deleteTransactionSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.transactions = action.payload;
    },
    deleteTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loadTransactionStart,
  loadTransactionFailure,
  loadTransactionSuccess,
  updateTransactionFailure,
  updateTransactionSuccess,
  updateTransactionStart,
  deleteTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess
} = transactionSlice.actions;
export default transactionSlice.reducer;
