import { createSlice } from "@reduxjs/toolkit";
import { getAdminAllCancelBookingPosts, getAdminAllPastgBookingPosts, getAdminAllUpcomingBookingPosts, getAllAdminActiveBookingPosts, getAllAdminBookingPosts, getTotalAmountPosts, getTotalBookingPosts } from "../action/adminDashboardAction";


const initialState = {
  allBookings: [],
  activeBookings: [],
  activeBookingCount: 0,
  cancelBooking: [],
  cancelBookingCount: 0,
  upcomingBookings: [],
  totalUpcomingAmount: 0,
  totalUpcomingCount: 0,
  pastBookings: [],
  totalPastCount: 0,
  totalPastAmount: 0,
  totalAmount: 0,
  totalBooking: 0,
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
        state.activeBookings = action.payload.activeBookings || [];
        state.activeBookingCount = action.payload.activeBookings?.length || 0;
        state.message = "Active bookings fetched.";
      })
      .addCase(getAllAdminActiveBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch active bookings.";
      })
      .addCase(getAdminAllCancelBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching cancel bookings...";
      })
      .addCase(getAdminAllCancelBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cancelBooking = action.payload.cancelledBookings || [];
        state.cancelBookingCount = action.payload.cancelledBookings?.length || 0;
        state.message = "Cancelled bookings fetched.";
      })

      .addCase(getAdminAllCancelBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch cancel bookings.";
      })
      .addCase(getAdminAllUpcomingBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching upcoming bookings...";
      })
      .addCase(getAdminAllUpcomingBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.upcomingBookings = action.payload.upcomingBookings || [];
        state.totalUpcomingCount = action.payload.totalUpcomingCount?.length || 0;
        state.totalUpcomingAmount = action.payload.totalUpcomingAmount || 0;
        state.message = "Upcoming bookings fetched.";
      })
      .addCase(getAdminAllUpcomingBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch upcoming bookings.";
      })
      .addCase(getAdminAllPastgBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching past booking bookings...";
      })
      .addCase(getAdminAllPastgBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pastBookings = action.payload.pastBookings || [];
        state.totalPastCount = action.payload.count || 0;
        state.totalPastAmount = action.payload.totalPastAmount || 0;
        state.message = "Past bookings fetched.";
      })


      .addCase(getAdminAllPastgBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch past bookings.";
      })
      // Total Amount
      .addCase(getTotalAmountPosts.fulfilled, (state, action) => {
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(getTotalAmountPosts.rejected, (state, action) => {
        state.totalAmount = 0;
        state.message = action.payload || "Failed to fetch total amount";
      })

      // Total Booking
      .addCase(getTotalBookingPosts.fulfilled, (state, action) => {
        state.totalBooking = action.payload.totalBooking || 0;
      })
      .addCase(getTotalBookingPosts.rejected, (state, action) => {
        state.totalBooking = 0;
        state.message = action.payload || "Failed to fetch total bookings";
      })

  },
});

export const { resetDashboardState } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;
