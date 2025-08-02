import { createSlice } from "@reduxjs/toolkit";
import {
  getAllActiveGuest,
  getAllBannedGuest,
  getAllDailyActiveGuest,
  getAllGuestRegister,
  getAllLogoutGuest,
  getAllNewRegisterGuest,
  getAllOnlineGuest,
  getTotalGuestRegister,
} from "../action/adminGuestAction";

const initialState = {
  totalGuestRegister: 0,
  allGuests: [],
  activeGuests: [],
  activeGuestsCount: 0,
  dailyActiveGuests: [],
  dailyActiveGuestsCount: 0,
  onlineGuests: [],
  onlineGuestsCount: 0,
  logoutGuests: [],
  logoutGuestsCount: 0,
  newRegisterGuests: [],
  newRegisterGuestsCount: 0,
  bannedGuests: [],
  bannedGuestsCount: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminGuestSlice = createSlice({
  name: "adminGuest",
  initialState,
  reducers: {
    resetAdminGuesttState: (state) => {
      state.totalGuestRegister = 0;
      state.allGuests = [];
      state.activeGuests = [];
      state.activeGuestsCount = 0;
      state.dailyActiveGuests = [];
      state.dailyActiveGuestsCount = 0;
      state.onlineGuests = [];
      state.onlineGuestsCount = 0;
      state.logoutGuests = [];
      state.logoutGuestsCount = 0;
      state.newRegisterGuests = [];
      state.newRegisterGuestsCount = 0;
      state.bannedGuests = [];
      state.bannedGuestsCount = 0;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Total Guest Register
      .addCase(getTotalGuestRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading total guest registration count...";
      })
      .addCase(getTotalGuestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalGuestRegister = action.payload.totalGuest || 0;
        state.message = action.payload.message || "Total guest registrations fetched successfully.";
      })
      .addCase(getTotalGuestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch total guest registrations.";
      })

      // All Guest Register
      .addCase(getAllGuestRegister.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Loading all guest data...";
      })
      .addCase(getAllGuestRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allGuests = action.payload.guests || [];
        state.message = action.payload.message || "All guest records fetched successfully.";
      })
      .addCase(getAllGuestRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch guest records.";
      })

      // Active Guests
      .addCase(getAllActiveGuest.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading active guests...";
      })
      .addCase(getAllActiveGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activeGuests = action.payload.guests || [];
        state.activeGuestsCount = action.payload.count || 0;
        state.message = "Active guests fetched successfully.";
      })
      .addCase(getAllActiveGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch active guests.";
      })

      // Daily Active Guests
      .addCase(getAllDailyActiveGuest.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading daily active guests...";
      })
      .addCase(getAllDailyActiveGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dailyActiveGuests = action.payload.guests || [];
        state.dailyActiveGuestsCount = action.payload.count || 0;
        state.message = "Daily active guests fetched successfully.";
      })
      .addCase(getAllDailyActiveGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch daily active guests.";
      })

      // Online Guests
      .addCase(getAllOnlineGuest.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading online guests...";
      })
      .addCase(getAllOnlineGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.onlineGuests = action.payload.guests || [];
        state.onlineGuestsCount = action.payload.count || 0;
        state.message = "Online guests fetched successfully.";
      })
      .addCase(getAllOnlineGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch online guests.";
      })

      // Logout Guests
      .addCase(getAllLogoutGuest.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading logout guests...";
      })
      .addCase(getAllLogoutGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logoutGuests = action.payload.guests || [];
        state.logoutGuestsCount = action.payload.count || 0;
        state.message = "Logout guests fetched successfully.";
      })
      .addCase(getAllLogoutGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch logout guests.";
      })

      // New Registered Guests
      .addCase(getAllNewRegisterGuest.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading new registered guests...";
      })
      .addCase(getAllNewRegisterGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newRegisterGuests = action.payload.guests || [];
        state.newRegisterGuestsCount = action.payload.count || 0;
        state.message = "Newly registered guests fetched successfully.";
      })
      .addCase(getAllNewRegisterGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch new registered guests.";
      })

      // Banned Guests
      .addCase(getAllBannedGuest.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading banned guests...";
      })
      .addCase(getAllBannedGuest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bannedGuests = action.payload.guests || [];
        state.bannedGuestsCount = action.payload.count || 0;
        state.message = "Banned guests fetched successfully.";
      })
      .addCase(getAllBannedGuest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch banned guests.";
      });
  },
});

export const { resetAdminGuesttState } = adminGuestSlice.actions;
export default adminGuestSlice.reducer;