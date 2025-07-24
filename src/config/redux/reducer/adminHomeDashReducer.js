import { createSlice } from "@reduxjs/toolkit";
import { getAllPropertyAdminPosts, getSinglePropertyAdminPosts } from "../action/adminHomeDashAction";


const initialState = {
  adminProperties: [],
  adminSingleProperty: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const adminHomeDashSlice = createSlice({
  name: "adminHomeDash",
  initialState,
  reducers: {
    resetAdminState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.adminSingleProperty = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPropertyAdminPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all admin properties...";
      })
      .addCase(getAllPropertyAdminPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Admin properties fetched successfully!";
        state.adminProperties = action.payload.AdmingetAllProperty || []; // ✅ Ensure fallback
      })
      .addCase(getAllPropertyAdminPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to fetch admin properties.";
      })
      .addCase(getSinglePropertyAdminPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all admin properties...";
      })
      .addCase(getSinglePropertyAdminPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Admin single property fetched successfully!";
        state.adminSingleProperty = action.payload?.property ?? null;
      })

      .addCase(getSinglePropertyAdminPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to fetch admin properties.";
      })
  },
});

export const { resetAdminState } = adminHomeDashSlice.actions;
export default adminHomeDashSlice.reducer;


