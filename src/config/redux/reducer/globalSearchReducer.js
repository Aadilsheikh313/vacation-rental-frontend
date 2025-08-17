import { createSlice } from "@reduxjs/toolkit";
import {
  adminSearchAction,
  guestSearchAction,
  hostSearchAction,
} from "../action/globalSearchAction";

const initialState = {
  users: [],
  properties: [],
  experiences: [],
  bookings: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const globalSearchSlice = createSlice({
  name: "globalSearch",
  initialState,
  reducers: {
    resetSearch: () => initialState, // pura state reset
    resetStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // ================== ADMIN SEARCH ==================
    builder
      .addCase(adminSearchAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Admin searching...";
      })
      .addCase(adminSearchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Admin search completed ✅";

        // API se { users, properties } aa raha hai
        state.users = action.payload.users || [];
        state.properties = action.payload.properties || [];
      })
      .addCase(adminSearchAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Admin search failed ❌";
      });

    // ================== GUEST SEARCH ==================
    builder
      .addCase(guestSearchAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Guest searching...";
      })
      .addCase(guestSearchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Guest search completed ✅";

        // API se { properties } aa raha hai
        state.properties = action.payload.properties || [];
      })
      .addCase(guestSearchAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Guest search failed ❌";
      });

    // ================== HOST SEARCH ==================
    builder
      .addCase(hostSearchAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Host searching...";
      })
      .addCase(hostSearchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Host search completed ✅";

        // API se { properties } aa raha hai
        state.properties = action.payload.properties || [];
      })
      .addCase(hostSearchAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Host search failed ❌";
      });
  },
});

export default globalSearchSlice.reducer;
export const { resetSearch, resetStatus } = globalSearchSlice.actions;
