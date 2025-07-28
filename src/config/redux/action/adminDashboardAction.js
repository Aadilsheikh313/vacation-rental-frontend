import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getAdminAllCancelBookingApi, getAdminAllPastBookingApi, getAdminAllUpcomingBookingApi, getAllAdminActiveBookingApi, getAllAdminBookingApi, getTotalAmountgApi, getTotalBookingApi } from "../../../api/AdimApi/adminDashboardApi";


export const getAllAdminBookingPosts = createAsyncThunk(
    "adminbooking/getAllAdminBookingPosts",
    async(_ , thunkAPI)=> {
       try {
        const response = await getAllAdminBookingApi();
        return thunkAPI.fulfillWithValue(response);
       } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  bookings");
       }
    }
)
export const getAllAdminActiveBookingPosts = createAsyncThunk(
    "adminbooking/getAllAdminActiveBookingPosts",
    async(_ , thunkAPI)=> {
       try {
        const response = await getAllAdminActiveBookingApi();
        return thunkAPI.fulfillWithValue(response);
       } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all Active fetch  bookings");
       }
    }
)

export const getAdminAllCancelBookingPosts = createAsyncThunk(
    "adminbooking/getAdminAllCancelBookingPosts",
    async(_, thunkAPI) =>{
        try {
            const response = await getAdminAllCancelBookingApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all cancel fetch  bookings");
        }
    }
)


export const getAdminAllUpcomingBookingPosts = createAsyncThunk(
    "adminbooking/getAdminAllUpcomingBookingPosts",
    async(_, thunkAPI) =>{
        try {
            const response = await getAdminAllUpcomingBookingApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all cancel fetch  bookings");
        }
    }
)

export const getAdminAllPastgBookingPosts = createAsyncThunk(
    "adminbooking/getAdminAllPastgBookingPosts",
    async(_, thunkAPI) =>{
        try {
            const response = await getAdminAllPastBookingApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all cancel fetch  bookings");
        }
    }
)
export const getTotalAmountPosts = createAsyncThunk(
  "adminbooking/getTotalAmountPosts",
  async (_, thunkAPI) => {
    try {
      const response = await getTotalAmountgApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch total amount");
    }
  }
);

export const getTotalBookingPosts = createAsyncThunk(
  "adminbooking/getTotalBookingPosts",
  async (_, thunkAPI) => {
    try {
      const response = await getTotalBookingApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch total bookings");
    }
  }
);
