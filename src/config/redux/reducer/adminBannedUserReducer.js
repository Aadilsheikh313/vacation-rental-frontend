import { createSlice } from "@reduxjs/toolkit";
import { banUserByAdmin, fetchBanLogs, unbanUserByAdmin } from "../action/adminBannedUserAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  banLogs: [],
};

const adminBannedUserSlice = createSlice({
  name: "adminBannedUser",
  initialState,
  reducers: {
    resetBanState: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // ✅ Ban user
    builder
      .addCase(banUserByAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Banning user...";
      })
      .addCase(banUserByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || "User banned successfully.";
      })
      .addCase(banUserByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to ban user.";
      })

      // ✅ Unban user
      .addCase(unbanUserByAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Unbanning user...";
      })
      .addCase(unbanUserByAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload?.message || "User unbanned successfully.";
      })
      .addCase(unbanUserByAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to unban user.";
      })

      // ✅ Fetch ban/unban logs
      .addCase(fetchBanLogs.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching ban logs...";
      })
      .addCase(fetchBanLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.banLogs = action.payload || [];
        state.message = "Ban logs fetched successfully.";
      })
      .addCase(fetchBanLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch ban logs.";
      });
  },
});

export const { resetBanState } = adminBannedUserSlice.actions;
export default adminBannedUserSlice.reducer;
