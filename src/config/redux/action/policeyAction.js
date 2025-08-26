import { createAsyncThunk } from "@reduxjs/toolkit";
import { policesGetApi, policesPostApi, policesUpdateApi } from "../../../api/policyApi";


// ✅ Create Amenities
export const policesPost = createAsyncThunk(
  "policy/policesPost",
  async ({ propertyId, policesData }, thunkAPI) => {
    try {
      const response = await policesPostApi(propertyId, policesData);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to post policy");
    }
  }
);

// ✅ Get Amenities
export const policesGet = createAsyncThunk(
  "policy/policesGet",
  async (propertyId, thunkAPI) => {
    try {
      const response = await policesGetApi(propertyId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch polices");
    }
  }
);

// ✅ Update Amenities
export const policesUpdate = createAsyncThunk(
  "policy/policesUpdate",
  async ({ propertyId, policesData }, thunkAPI) => {
    try {
      const response = await policesUpdateApi(propertyId, policesData);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update policy");
    }
  }
);
