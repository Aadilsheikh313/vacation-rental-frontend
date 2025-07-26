import { createSlice } from "@reduxjs/toolkit";
import { getAllActiveBookingPosts } from "../action/adminDashboardAction";


const initialState = {
  bookings: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {
    resetDashboardState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.bookings = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllActiveBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Fetching active bookings...";
      })
      .addCase(getAllActiveBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.bookings || []; // fallback to []
        state.message = "Active bookings fetched successfully";
      })
      .addCase(getAllActiveBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to fetch bookings.";
      });
  },
});

export const { resetDashboardState } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
