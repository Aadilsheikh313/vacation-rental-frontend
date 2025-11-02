import { createSlice } from "@reduxjs/toolkit";
import {
  getAllActiveHostRegister, getAllBannedHostRegister, getAllHostRegister,
  getAllLogoutHostRegister,
  getAllNewHostRegister,
  getAllOnlineHostRegister,
} from "../action/adminHostAction";

const initialState = {
  totalHostRegister: 0,
  allHosts: [],
  allActiveHosts: [],
  allActiveHostsCount: 0,
  onlineHosts: [],
  totalOnlineHostsCount: 0,
  newHosts: [],
  totalNewHostsCount: 0,
  logoutHosts: [],
  totalLogoutHostsCount: 0,
  bannedHosts: [],
  totalBannedHostsCount: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminHostSlice = createSlice({
  name: "adminHost",
  initialState,
  reducers: {
    resetAdminHostState: (state) => {
      state.totalHostRegister = 0;
      state.allHosts = [];
      state.allActiveHosts = [];
      state.allActiveHostsCount = 0;
      state.onlineHosts = [];
      state.totalOnlineHostsCount = 0;
      state.newHosts = [];
      state.totalNewHostsCount = 0;
      state.logoutHosts = [];
      state.totalLogoutHostsCount = 0;
      state.bannedHosts = [];
      state.totalBannedHostsCount = 0;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
    
      .addCase(getAllHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading host list...";
      })
      .addCase(getAllHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allHosts = Array.isArray(action.payload.hosts) ? action.payload.hosts : [];
        state.message = action.payload.message || "Host list loaded successfully.";
      })
      .addCase(getAllHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to load host list.";
      })
      .addCase(getAllActiveHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading actvie host list...";
      })
      .addCase(getAllActiveHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allActiveHosts = Array.isArray(action.payload.hosts) ? action.payload.hosts : [];
        state.allActiveHostsCount = action.payload.count;
        state.message = "Host Actvie list loaded successfully.";
      })
      .addCase(getAllActiveHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Actvie load host list.";
      })
      .addCase(getAllOnlineHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading online host list...";
      })
      .addCase(getAllOnlineHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.onlineHosts = Array.isArray(action.payload.hosts) ? action.payload.hosts : [];
        state.totalOnlineHostsCount = action.payload.count;
        state.message = "Host online list loaded successfully.";
      })
      .addCase(getAllOnlineHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to online load host list.";
      })
      .addCase(getAllNewHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading new host list...";
      })
      .addCase(getAllNewHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newHosts = Array.isArray(action.payload.hosts) ? action.payload.hosts : [];
        state.totalNewHostsCount = action.payload.count;
        state.message = "Host new list loaded successfully.";
      })
      .addCase(getAllNewHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to new load host list.";
      })
      .addCase(getAllLogoutHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading logout host list...";
      })
      .addCase(getAllLogoutHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logoutHosts = Array.isArray(action.payload.hosts) ? action.payload.hosts : [];
        state.totalLogoutHostsCount = action.payload.count;
        state.message = "Host Logout hosts list loaded successfully.";
      })
      .addCase(getAllLogoutHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Logout  load host list.";
      })
      .addCase(getAllBannedHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading Banned host list...";
      })
      .addCase(getAllBannedHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bannedHosts = Array.isArray(action.payload.hosts) ? action.payload.hosts : [];
        state.totalBannedHostsCount = action.payload.count;
        state.message = "Host Banned hosts list loaded successfully.";
      })
      .addCase(getAllBannedHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Banned  load host list.";
      })
  },
});

export const { resetAdminHostState } = adminHostSlice.actions;
export default adminHostSlice.reducer;
