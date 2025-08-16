import { createSlice } from "@reduxjs/toolkit";
import { globalSearchAction } from "../action/globalSearchAction";

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
    resetSearch: () => initialState,  // pura state reset
    resetStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(globalSearchAction.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Searching...";
      })
      .addCase(globalSearchAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Search completed successfully ✅";

        // ✅ API ke response ka structure:
        // { success: true, data: { users, properties, experiences, bookings } }
        const { users, properties, experiences, bookings } = action.payload.data || {};

        state.users = users || [];
        state.properties = properties || [];
        state.experiences = experiences || [];
        state.bookings = bookings || [];
      })
      .addCase(globalSearchAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Search failed ❌";
      });
  },
});

export default globalSearchSlice.reducer;
export const { resetSearch, resetStatus } = globalSearchSlice.actions;
