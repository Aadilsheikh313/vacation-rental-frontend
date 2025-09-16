import { createSlice } from "@reduxjs/toolkit";
import { GetGuestPastBookingPost } from "../action/guestDashAction";

const initialState = {
  PastBookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,   
  message: "",
  totalPastBookings: 0,
};

const guestDash = createSlice({
  name: "guestDash",
  initialState,
  reducers: {
    guestDashreset: (state) => {
      state.PastBookings = [];
      state.totalPastBookings = 0;
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

        // Axios se aa raha hai to hamesha `action.payload.data`
        state.PastBookings = action.payload?.data?.bookings || [];
        state.totalPastBookings = action.payload?.data?.totalPastBookings || 0;
        state.message = action.payload?.data?.message || "Past bookings fetched successfully";
      })
      // 🔹 REJECTED
      .addCase(GetGuestPastBookingPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Something went wrong";
      });
  },
});

export const { guestDashreset, resetStatus } = guestDash.actions;
export default guestDash.reducer;
