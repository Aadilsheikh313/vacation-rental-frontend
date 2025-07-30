import { createSlice } from "@reduxjs/toolkit";
import { getAllActiveHostRegister, getAllHostRegister,
   getAllOnlineHostRegister,
   getTotalHostRegister
   } from "../action/adminHostAction";

const initialState = {
  totalHostRegister: 0,
  allHosts: [],
  allActiveHosts: [],
  allActiveHostsCount: 0,
  onlineHosts: [],
  totalOnlineHostsCount: 0,
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
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalHostRegister.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching total host registrations...";
      })
      .addCase(getTotalHostRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalHostRegister = action.payload.totalHosts || 0;
        state.message =  "Host registrations fetched.";
        // state.message = action.payload.message || "Host registrations fetched.";
      })
      .addCase(getTotalHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch host registrations.";
      })
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
        state.message =  "Host Actvie list loaded successfully.";
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
        state.message =  "Host online list loaded successfully.";
      })
      .addCase(getAllOnlineHostRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to online load host list.";
      })
  },
});

export const { resetAdminHostState } = adminHostSlice.actions;
export default adminHostSlice.reducer;
