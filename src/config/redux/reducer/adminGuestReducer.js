import { createSlice } from "@reduxjs/toolkit";
import { getTotalGuestRegister } from "../action/adminGuestAction";

const initialState = {
  totalGuestRegister: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminGuestSlice = createSlice({
  name: "adminGuest",
  initialState,
  reducers: {
    resetAdminHostState: (state) => {
      state.totalHostRegister = 0;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalGuestRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching total Guest registrations...";
      })
      .addCase(getTotalGuestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalGuestRegister = action.payload.totalGuest || 0;
        state.message = action.payload.message || "Guest registrations fetched.";
      })
      .addCase(getTotalGuestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch Guest registrations.";
      });
  },
});

export const { resetAdminGuesttState } = adminGuestSlice.actions;
export default adminGuestSlice.reducer;
