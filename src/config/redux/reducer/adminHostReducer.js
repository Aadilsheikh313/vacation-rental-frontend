import { createSlice } from "@reduxjs/toolkit";
import { getTotalHostRegister } from "../action/adminHostAction";

const initialState = {
  totalHostRegister: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminHostSlice = createSlice({
  name: "adminHost",
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
      .addCase(getTotalHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching total host registrations...";
      })
      .addCase(getTotalHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalHostRegister = action.payload.totalHosts || 0;
        state.message = action.payload.message || "Host registrations fetched.";
      })
      .addCase(getTotalHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch host registrations.";
      });
  },
});

export const { resetAdminHostState } = adminHostSlice.actions;
export default adminHostSlice.reducer;
