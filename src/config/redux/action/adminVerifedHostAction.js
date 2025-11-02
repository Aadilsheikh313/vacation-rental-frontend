import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GetAllHostPendingApi,
  GetAllRejectedHostApi,
  GetAllVerifiedHostApi,
  GetUserProfileApi,
  ReverificationApi,
  VerifyOrRejectHostApi
} from "../../../api/AdimApi/adminVerifedHostApi";


export const GetAllHostPendingAction = createAsyncThunk(
  "verify/GetAllHostPendingAction",
  async (_, thunkAPI) => {
    try {
      const response = await GetAllHostPendingApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      console.error("❌ Redux Thunk Error (Pending Hosts):", error);

      // ✅ Use correct property name: error.response (not error.respose)
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Admin failed to fetch all pending host registrations.";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);


export const GetAllVerifedHostAction = createAsyncThunk(
  "verify/GetAllVerifedHostAction",
  async (_, thunkAPI) => {
    try {
      const response = await GetAllVerifiedHostApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify or reject host.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)

export const GetAllRejectHostAction = createAsyncThunk(
  "verify/GetAllRejectHostAction",
  async (_, thunkAPI) => {
    try {
      const response = await GetAllRejectedHostApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify or reject host.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
)


export const VerifyOrRejectHostAction = createAsyncThunk(
  "verify/VerifyOrRejectHostAction",
  async ({ hostId, action, note }, thunkAPI) => {
    try {
      const response = await VerifyOrRejectHostApi(hostId, action, note);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to verify or reject host.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const ReverifiedAction = createAsyncThunk(
   "verify/ReverifiedAction",
   async({ hostId, action, note }, thunkAPI) =>{
    try {
      const response = await ReverificationApi(hostId, action, note);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to Reverify  host.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
   }
)

export const GetUserProfileAction = createAsyncThunk(
  "verify/GetUserProfileAction",
  async (userId, thunkAPI) => {  
    try {
      return await GetUserProfileApi(userId);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to get user profile.";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
