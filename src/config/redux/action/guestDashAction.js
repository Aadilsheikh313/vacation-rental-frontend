import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetGuestCancelBookingApi,
  GetGuestCurrentBookingApi,
  GetGuestPastBookingApi,
  GetGuestUpcoomingBookingApi
} from "../../../api/guestDashApi";


export const GetGuestPastBookingPost = createAsyncThunk(
  "guest/GetGuestPastBookingPost",
  async (_, thunkAPI) => {
    try {
      const response = await GetGuestPastBookingApi();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch Booking past listing");
    }
  }
);

export const GetGuestCurrentBookingPost = createAsyncThunk(
  "guest/GetGuestCurrentBookingPost",
  async (_, thunkAPI) => {
    try {
      const response = await GetGuestCurrentBookingApi();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to featch booking current listing");
    }
  }
)

export const GetGuestUpcommingtBookingPost = createAsyncThunk(
  "guest/GetGuestUpcommingtBookingPost",
  async (_, thunkAPI) => {
    try {
      const response = await GetGuestUpcoomingBookingApi();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to featch booking upcomming listing");
    }
  }
)

export const GetGuestCancelBookingPost = createAsyncThunk(
  "guest/GetGuestCancelBookingPost",
  async (_, thunkAPI) => {
    try {
      const response = await GetGuestCancelBookingApi();
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to featch booking cancel listing");
    }
  }
)