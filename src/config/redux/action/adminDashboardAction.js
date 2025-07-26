import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllActiveBookingApi } from "../../../api/AdimApi/adminDashboardApi";


export const getAllActiveBookingPosts = createAsyncThunk(
    "adminbooking/getAllActiveBookingPosts",
    async(_ , thunkAPI)=> {
       try {
        const response = await getAllActiveBookingApi();
        return thunkAPI.fulfillWithValue(response);
       } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  bookings");
       }
    }
)