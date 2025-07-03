import { createAsyncThunk } from "@reduxjs/toolkit";
import { cancelBookingApi, checkBookingConflictApi, editBookingApi, getActiveBookingApi, getBookingPropertyApi, getHostBookingHistoryApi, getPastandCancelledBookingApi, postBookingPropertyApi } from "../../../api/bookingApi";


// 🔹 GET Booking
export const getBookingPropertyPosts = createAsyncThunk(
  "booking/getBookingPropertyPosts",
  async (_, thunkAPI) => {
    try {
      const response = await getBookingPropertyApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Get booking error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to fetch bookings"
      );
    }
  }
)

// 🔹 POST Booking
export const postBookingPropertyPosts = createAsyncThunk(
  "booking/postBookingPropertyPosts",
  async ({ propertyId, bookingDate }, thunkAPI) => {
    try {
      const response = await postBookingPropertyApi(propertyId, bookingDate);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Post booking error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to book this property"
      );
    }
  }
);

//Booking Edit  
export const editBookingPosts = createAsyncThunk(
  "booking/editBookingPosts",
  async ({ checkIn, checkOut, guests, token, bookingId }, thunkAPI) => {
    try {
      const response = await editBookingApi(checkIn, checkOut, token, guests, bookingId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Edit booking error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to edit booking"
      );
    }
  }
);


//Cancel booking
export const cancelBookingPosts = createAsyncThunk(
  "booking/cancelBookingPosts",
  async ({ bookingId, token }, thunkAPI) => {
    try {
      const response = await cancelBookingApi(bookingId, token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Cancel booking error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to cancel booking"
      );
    }
  }
);

// 🔹 Check Booking Conflict
export const checkBookingConflict = createAsyncThunk(
  "booking/checkBookingConflict",
  async ({ propertyId, token, userId }, thunkAPI) => {
    try {
      const response = await checkBookingConflictApi({ propertyId, token, userId });
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Conflict check error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to check booking conflict"
      );
    }
  }
);

//Get Guest Past and Cancelled 
export const getPastandCancelledBookingPosts = createAsyncThunk(
  "bookings/getPastandCancelledBookingPosts",
  async ({ token }, thunkAPI) => {
    try {
      const response = await getPastandCancelledBookingApi(token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Conflict check error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to check booking conflict"
      );
    }
  }
)

//Get Host Active and upcomming Property 
export const getActiveBookingPosts = createAsyncThunk(
  "booking/getActiveBookingPosts",
  async ({ token, page = 1, limit = 10 }, thunkAPI) => {
    try {
      const response = await getActiveBookingApi(token, page, limit);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Host Active and Upcomming check error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to Active and Upcomming booking property"
      );
    }
  }
)

//Get Histroy booking Host
export const getHostBookingHistoryPosts = createAsyncThunk(
  "bookings/getHostBookingHistoryPosts",
  async({token}, thunkAPI) =>{
    try {
      const response = await getHostBookingHistoryApi(token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Host Histroy check error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to Host Histroy booking property"
      );
    }
  }
)
