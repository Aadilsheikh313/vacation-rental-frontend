import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getAllAdminActiveBookingApi, getAllAdminBookingApi } from "../../../api/AdimApi/adminDashboardApi";


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
        return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  bookings");
       }
    }
)