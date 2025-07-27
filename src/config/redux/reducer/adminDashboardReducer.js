import { createSlice } from "@reduxjs/toolkit";
import { getAllAdminActiveBookingPosts, getAllAdminBookingPosts } from "../action/adminDashboardAction";


const initialState = {
  allBookings: [],
  activeBookings: [],
  activeBookingCount: 0,
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
      .addCase(getAllAdminBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all bookings...";
      })
      .addCase(getAllAdminBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allBookings = action.payload.bookings || [];
        state.message = "All bookings fetched.";
      })
      .addCase(getAllAdminBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch all bookings.";
      })

      .addCase(getAllAdminActiveBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching active bookings...";
      })
      .addCase(getAllAdminActiveBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("ACTIVE BOOKING PAYLOAD:", action.payload); 
        state.activeBookings = action.payload.activeBookings || [];
        state.activeBookingCount = action.payload.count || 0;
        console.log("ACTIVE Booking",action.payload.count);
        
        state.message = "Active bookings fetched.";
      })
      .addCase(getAllAdminActiveBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch active bookings.";
      });

  },
});

export const { resetDashboardState } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
