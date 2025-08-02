import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllActiveGuestApi, 
    getAllBannedGuestApi, 
    getAllDailyActiveGuestApi, 
    getAllGuestRegisterApi, 
    getAllLogoutGuestApi, 
    getAllNewRegisterGuestApi, 
    getAllOnlineGuestApi, 
    getTotalGuestRegisterApi,
 } from "../../../api/AdimApi/adminGuestApi";



export const getTotalGuestRegister = createAsyncThunk(
    "adminposts/getTotalGuestRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getTotalGuestRegisterApi();           
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  Guest Register");
        }
    }
);

export const getAllGuestRegister = createAsyncThunk(
    "adminposts/getAllGuestRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllGuestRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllGuestRegister");
        }
    }
);

export const getAllActiveGuest = createAsyncThunk(
  "adminGuests/getAllActiveGuest",
  async (_, thunkAPI) => {
    try {
      const response = await getAllActiveGuestApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch active guests.");
    }
  }
);

export const getAllDailyActiveGuest = createAsyncThunk(
  "adminGuests/getAllDailyActiveGuest",
  async (_, thunkAPI) => {
    try {
      const response = await getAllDailyActiveGuestApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch daily active guests.");
    }
  }
);

export const getAllOnlineGuest = createAsyncThunk(
  "adminGuests/getAllOnlineGuest",
  async (_, thunkAPI) => {
    try {
      const response = await getAllOnlineGuestApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch online guests.");
    }
  }
);

export const getAllLogoutGuest = createAsyncThunk(
  "adminGuests/getAllLogoutGuest",
  async (_, thunkAPI) => {
    try {
      const response = await getAllLogoutGuestApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch logout guests.");
    }
  }
);

export const getAllNewRegisterGuest = createAsyncThunk(
  "adminGuests/getAllNewRegisterGuest",
  async (_, thunkAPI) => {
    try {
      const response = await getAllNewRegisterGuestApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch newly registered guests.");
    }
  }
);

export const getAllBannedGuest = createAsyncThunk(
  "adminGuests/getAllBannedGuest",
  async (_, thunkAPI) => {
    try {
      const response = await getAllBannedGuestApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch banned guests.");
    }
  }
);



