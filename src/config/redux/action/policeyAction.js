
import { createAsyncThunk } from "@reduxjs/toolkit";
import { policesGetApi, policesPostApi, policesUpdateApi } from "../../../api/policyApi";

// ✅ Create Policy
export const policesPost = createAsyncThunk(
  "policy/policesPost",
  async ({ propertyId, policesData }, thunkAPI) => {
    const response = await policesPostApi(propertyId, policesData);
    if (response.success) return thunkAPI.fulfillWithValue(response);
    return thunkAPI.rejectWithValue(response.message);
  }
);

// ✅ Get Policy
export const policesGet = createAsyncThunk(
  "policy/policesGet",
  async (propertyId, thunkAPI) => {
    const response = await policesGetApi(propertyId);
    if (response.success) return thunkAPI.fulfillWithValue(response);
    return thunkAPI.rejectWithValue(response.message);
  }
);

// ✅ Update Policy
export const policesUpdate = createAsyncThunk(
  "policy/policesUpdate",
  async ({ propertyId, policesData }, thunkAPI) => {
    const response = await policesUpdateApi(propertyId, policesData);
    if (response.success) return thunkAPI.fulfillWithValue(response);
    return thunkAPI.rejectWithValue(response.message);
  }
);
