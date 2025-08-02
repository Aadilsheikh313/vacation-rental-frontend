import { createSlice } from "@reduxjs/toolkit";
import { getAllGuestRegister, getTotalGuestRegister } from "../action/adminGuestAction";

const initialState = {
  totalGuestRegister: 0,
  allGuests: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminGuestSlice = createSlice({
  name: "adminGuest",
  initialState,
  reducers: {
    resetAdminGuesttState: (state) => {
      state.totalHostRegister = 0;
      state.allGuests = [];
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
      })
      .addCase(getAllGuestRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Fetching all guest details...";
      })
      .addCase(getAllGuestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allGuests = action.payload.guests || [];
        state.message = action.payload.message || "All guests fetched.";
      })
      .addCase(getAllGuestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch all guest register.";
      });
  },
});

export const { resetAdminGuesttState } = adminGuestSlice.actions;
export default adminGuestSlice.reducer;