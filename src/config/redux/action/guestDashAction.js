import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetGuestPastBookingApi } from "../../../api/guestDashApi";


export const GetGuestPastBookingPost = createAsyncThunk(
  "guest/GetGuestPastBookingPost",
  async (_, thunkAPI) => {
    try {
      const response = await GetGuestPastBookingApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Booking past listing");
    }
  }
);
