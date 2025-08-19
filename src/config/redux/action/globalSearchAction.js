import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminSearchApi, guestSearchApi, hostSearchApi } from "../../../api/globalSearchApi";



export const adminSearchAction = createAsyncThunk(
  "search/adminSearchAction",
  async (query, thunkAPI) => {
    try {
      const response = await adminSearchApi(query); 
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Search Action failed"
      );
    }
  }
);

export const guestSearchAction = createAsyncThunk(
  "search/guestSearchAction",
  async (query, thunkAPI) => {
    try {
      const response = await guestSearchApi(query);
      return thunkAPI.fulfillWithValue(response);
      
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Search Action failed"
      );
    }
  }
);

export const hostSearchAction = createAsyncThunk(
  "search/hostSearchAction",
  async (query, thunkAPI) => {
    try {
      const response = await hostSearchApi(query); 
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Search Action failed"
      );
    }
  }
);