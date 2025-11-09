import { createSlice } from "@reduxjs/toolkit";
import { banPropertyByAdmin, fetchBanPropertyLogs, unbanPropertyByAdmin } from "../action/adminActivePropertyAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  banPropertyLogs: [],
  PRoperty: {},
};

const adminBannedPropertySlice = createSlice({
  name: "adminBannedProperty",
  initialState,
  reducers: {
    resetBanPropertyState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // ✅ Ban user
    builder
      .addCase(banPropertyByAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Banning property...";
      })
      .addCase(banPropertyByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || "Property banned successfully.";
      })
      .addCase(banPropertyByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to ban property.";
      })

      // ✅ Unban property
      .addCase(unbanPropertyByAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Unbanning property...";
      })
      .addCase(unbanPropertyByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || "Property unbanned successfully.";
      })
      .addCase(unbanPropertyByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to unban property.";
      })

      // ✅ Fetch ban/unban logs
      .addCase(fetchBanPropertyLogs.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching ban  logs proprty...";
      })
      .addCase(fetchBanPropertyLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.banPropertyLogs = Array.isArray(action.payload.logs)
          ? [...action.payload.logs].reverse() // ✅ Safe reverse
          : [];
        state.PRoperty = action.payload.property || {};
        state.message = "Ban logs fetched successfully.";
      })

      .addCase(fetchBanPropertyLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch ban logs.";
      });
  },
});

export const { resetBanPropertyState } = adminBannedPropertySlice.actions;
export default adminBannedPropertySlice.reducer;
