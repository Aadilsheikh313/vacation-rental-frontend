import { createSlice } from "@reduxjs/toolkit";
import {
  GetGuestCancelBookingPost,
  GetGuestCurrentBookingPost,
  GetGuestPastBookingPost,
  GetGuestUpcommingtBookingPost
} from "../action/guestDashAction";

const initialState = {
  PastBookings: [],
  CurrentBooking: [],
  UpcommingBooking: [],
  CancelBooking: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalPastBookings: 0,
  totalCurrentBookings: 0,
  totalUpcommingBookings: 0,
  totalCancelBookings : 0,
};

const guestDash = createSlice({
  name: "guestDash",
  initialState,
  reducers: {
    guestDashreset: (state) => {
      state.PastBookings = [];
      state.totalPastBookings = 0;
    },
    guestCurrreset: (state) => {
      state.CurrentBooking = [];
      state.totalCurrentBookings = 0;
    },
    guestUpcomming: (state) => {
      state.UpcommingBooking = [];
      state.totalUpcommingBookings = 0;
    },
    guestcancel: (state) =>{
      state.CancelBooking = [];
      state.totalCancelBookings = 0;
    },
    resetStatus: (state) => {
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 PENDING
      .addCase(GetGuestPastBookingPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      // 🔹 FULFILLED
      .addCase(GetGuestPastBookingPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.PastBookings = action.payload?.bookings || [];
        state.totalPastBookings = action.payload?.totalPastBookings || 0;
        state.message = action.payload?.message || "Past bookings fetched successfully";
      })

      // 🔹 REJECTED
      .addCase(GetGuestPastBookingPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Something went wrong";
      })
          // 🔹 PENDING
      .addCase(GetGuestCurrentBookingPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      // 🔹 FULFILLED
      .addCase(GetGuestCurrentBookingPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.CurrentBooking = action.payload?.bookings || [];
        state.totalCurrentBookings = action.payload?.totalCurrentBookings || 0;
        state.message = action.payload?.message || "Current bookings fetched successfully";
      })

      // 🔹 REJECTED
      .addCase(GetGuestCurrentBookingPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Something went wrong";
      })
          // 🔹 PENDING
      .addCase(GetGuestUpcommingtBookingPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      // 🔹 FULFILLED
      .addCase(GetGuestUpcommingtBookingPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.UpcommingBooking = action.payload?.bookings || [];
        state.totalUpcommingBookings = action.payload?.totalUpcommingBookings || 0;
        state.message = action.payload?.message || "Upcomming bookings fetched successfully";
      })

      // 🔹 REJECTED
      .addCase(GetGuestUpcommingtBookingPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Something went wrong";
      })
         // 🔹 PENDING
      .addCase(GetGuestCancelBookingPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      // 🔹 FULFILLED
      .addCase(GetGuestCancelBookingPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.CancelBooking = action.payload?.bookings || [];
        state.totalCancelBookings = action.payload?.totalCancelBookings || 0;
       state.message = action.payload?.message || "Cancel bookings fetched successfully";
      })

      // 🔹 REJECTED
      .addCase(GetGuestCancelBookingPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Something went wrong";
      })
  },
});

export const { guestDashreset, resetStatus, guestCurrreset, guestUpcomming , guestcancel} = guestDash.actions;
export default guestDash.reducer;
