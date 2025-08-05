import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminActivePropertyApi, adminInActivePropertyApi, getActiveLogsApi } from "../../../api/AdimApi/adminActivePropertyApi";


// ✅ Ban a user (Admin only)
export const banPropertyByAdmin = createAsyncThunk(
  "admin/banProperty",
  async ({ propertyId, reason }, thunkAPI) => {
    try {
      const response = await adminInActivePropertyApi(propertyId, reason);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "❌ Failed to ban user"
      );
    }
  }
);

// ✅ Unban a user (Same Admin only)
export const unbanPropertyByAdmin = createAsyncThunk(
  "admin/unbanProperty",
  async ({ propertyId, note }, thunkAPI) => {
    try {
      const response = await adminActivePropertyApi(propertyId, note);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "❌ Failed to unban user"
      );
    }
  }
);

// ✅ Get all Ban/Unban logs
export const fetchBanPropertyLogs = createAsyncThunk(
  "admin/fetchBanLogs",
  async (propertyId, thunkAPI) => {
    try {
      const logs = await getActiveLogsApi(propertyId);
      return thunkAPI.fulfillWithValue(logs);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "❌ Failed to fetch ban logs"
      );
    }
  }
);
