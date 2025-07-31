import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminBannedUserApi, adminUnbanUserApi, getBanLogsApi } from "../../../api/AdimApi/adminBannedUserApi";


// ✅ Ban a user (Admin only)
export const banUserByAdmin = createAsyncThunk(
  "admin/banUser",
  async ({ userId, reason }, thunkAPI) => {
    try {
      const response = await adminBannedUserApi(userId, reason);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "❌ Failed to ban user"
      );
    }
  }
);

// ✅ Unban a user (Same Admin only)
export const unbanUserByAdmin = createAsyncThunk(
  "admin/unbanUser",
  async ({ userId, note }, thunkAPI) => {
    try {
      const response = await adminUnbanUserApi(userId, note);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "❌ Failed to unban user"
      );
    }
  }
);

// ✅ Get all Ban/Unban logs
export const fetchBanLogs = createAsyncThunk(
  "admin/fetchBanLogs",
  async (_, thunkAPI) => {
    try {
      const logs = await getBanLogsApi();
      return thunkAPI.fulfillWithValue(logs);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "❌ Failed to fetch ban logs"
      );
    }
  }
);
