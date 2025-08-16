import { createAsyncThunk } from "@reduxjs/toolkit";
import { globalSearchApi } from "../../../api/globalSearchApi";



export const globalSearchAction = createAsyncThunk(
  "search/globalSearch",
  async (filters, thunkAPI) => {
    try {
      const response = await globalSearchApi(filters); // filters pass karo
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Search Action failed"
      );
    }
  }
);
