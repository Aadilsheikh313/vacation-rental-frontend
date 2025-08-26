import { createAsyncThunk } from "@reduxjs/toolkit";
import { amenitiesGetApi, amenitiesPostApi, amenitiesUpdateApi } from "../../../api/amenityApi";

// ✅ Create Amenities
export const amenitiesPost = createAsyncThunk(
  "amenity/amenitiesPost",
  async ({ propertyId, amenitiesData }, thunkAPI) => {
    try {
      const response = await amenitiesPostApi(propertyId, amenitiesData);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to post amenity");
    }
  }
);

// ✅ Get Amenities
export const amenitiesGet = createAsyncThunk(
  "amenity/amenitiesGet",
  async (propertyId, thunkAPI) => {
    try {
      const response = await amenitiesGetApi(propertyId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch amenities");
    }
  }
);

// ✅ Update Amenities
export const amenitiesUpdate = createAsyncThunk(
  "amenity/amenitiesUpdate",
  async ({ propertyId, amenitiesData }, thunkAPI) => {
    try {
      const response = await amenitiesUpdateApi(propertyId, amenitiesData);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to update amenity");
    }
  }
);
