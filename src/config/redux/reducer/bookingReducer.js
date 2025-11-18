import { createSlice } from "@reduxjs/toolkit";
import {
  getBookingPropertyPosts, postBookingPropertyPosts,
  editBookingPosts,
  cancelBookingPosts,
  getActiveBookingPosts,
  getHostBookingHistoryPosts,
  deleteGuestHistroyBookingPosts,
  checkBookingConflictPosts,
} from "../action/bookingAction ";


const initialState = {
  bookings: [],
  activeBookings: [],
  historyBookings: [],
  bookedDates: [],
  createdBooking: null,
  existingBooking: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",


  // Pagination state for host dashboard
  page: 1,
  totalPages: 0,
  totalBookings: 0,
  totalRevenue: 0,
  totalNights: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.conflictData = null;
      state.createdBooking = null;
      state.existingBooking = null; // Reset existing booking
    },
    setExistingBooking: (state, action) => {
      state.existingBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 GET Booking
      .addCase(getBookingPropertyPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading your bookings...";
      })
      .addCase(getBookingPropertyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload.bookings;
        state.message = "Bookings fetched successfully.";
      })
      .addCase(getBookingPropertyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 POST Booking
      .addCase(postBookingPropertyPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Booking in progress...";
      })
      .addCase(postBookingPropertyPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.bookings.unshift(action.payload.booking); // Add to start
        console.log(state.bookings.unshift(action.payload.booking) );
        state.createdBooking = action.payload.booking;
        console.log("CREATED BOOKING", action.payload.booking );
        
      })
      .addCase(postBookingPropertyPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 EDIT Booking
      .addCase(editBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating booking...";
      })
      .addCase(editBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;

        // Replace the old booking with the updated one
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload.updatedBooking._id
            ? action.payload.updatedBooking
            : booking
        );
      })
      .addCase(editBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 CANCEL Booking
      .addCase(cancelBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Cancelling booking...";
      })
      .addCase(cancelBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;

        // Mark the booking as cancelled
        state.bookings = state.bookings.map((booking) =>
          booking._id === action.payload.bookingId
            ? { ...booking, bookingStatus: "cancelled", paymentStatus: "refunded" }
            : booking
        );
      })
      .addCase(cancelBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 🔹 CHECK Booking Conflict
      .addCase(checkBookingConflictPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Checking booking conflicts...";
        state.conflictData = [];
        state.existingBooking = null;
      })
      .addCase(checkBookingConflictPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const data = action.payload;

        state.conflictData = data; // ✅ fix

        if (data.alreadyBookedByUser) {
          state.existingBooking = data.existingBooking;
          state.message = data.message;
        } else {
          state.bookedDates = data.bookedDates;
          state.message = data.alreadyBooked
            ? "This property has overlapping bookings."
            : "No booking conflicts.";
        }
      })

      .addCase(checkBookingConflictPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 DELETE Guest Past/Cancelled Booking
      .addCase(deleteGuestHistroyBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Deleting guest booking history...";
      })
      .addCase(deleteGuestHistroyBookingPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;

        // Filter out the deleted booking from the state
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload.bookingId
        );
      })
      .addCase(deleteGuestHistroyBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // 🔹 GET Host Active Bookings (production-ready)
      .addCase(getActiveBookingPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading active bookings...";
      })
      .addCase(getActiveBookingPosts.fulfilled, (state, action) => {
        const {
          bookings,
          totalActiveBookings,
          totalRevenue,
          totalNights,
          totalBookings,
          totalPages,
          page,
        } = action.payload;

        state.isLoading = false;
        state.isSuccess = true;
        state.activeBookings = bookings;
        state.totalRevenue = totalRevenue;
        state.totalNights = totalNights;
        state.totalBookings = totalBookings;
        state.totalPages = totalPages;
        state.page = page;
        state.message = "Active bookings loaded.";
      })
      .addCase(getActiveBookingPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // 🔹 GET Host Booking History
      .addCase(getHostBookingHistoryPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading host booking history...";
      })
      .addCase(getHostBookingHistoryPosts.fulfilled, (state, action) => {
        const {
          properties,
          totalRevenue,
          totalNights,
          totalBookings,
          totalPages,
          page,
        } = action.payload;

        state.isLoading = false;
        state.isSuccess = true;
        state.historyBookings = action.payload.properties;
        state.totalRevenue = totalRevenue;
        state.totalNights = totalNights;
        state.totalBookings = totalBookings;
        state.totalPages = totalPages;
        state.page = page;
        state.message = "Booking history loaded.";
      })

      .addCase(getHostBookingHistoryPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


  },
});

export default bookingSlice.reducer;
export const { resetBookingStatus, setExistingBooking } = bookingSlice.actions;
