import { createSlice } from "@reduxjs/toolkit";
import { policesGet, policesPost, policesUpdate } from "../action/policeyAction";

const initialState = {
  policy: null,   // single property ke liye ek policy
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    resetPolicy: () => initialState,
    resetStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Post Policy
      .addCase(policesPost.pending, (state) => {
        state.isLoading = true;
        state.message = "Posting policy...";
      })
      .addCase(policesPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.policy = action.payload.data?.newPolicy || null; 
        state.message = action.payload.message || "Policy posted successfully";
      })
      .addCase(policesPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to post policy";
      })

      // ✅ Get Policy
      .addCase(policesGet.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching policy...";
      })
      .addCase(policesGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.policy = action.payload.data?.policy || null; 
        state.message = action.payload.message || "Policy fetched successfully";
      })
      .addCase(policesGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch policy";
      })

      // ✅ Update Policy
      .addCase(policesUpdate.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating policy...";
      })
      .addCase(policesUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.policy = action.payload.data?.updatedPolicy || state.policy;
        state.message = action.payload.message || "Policy updated successfully";
      })
      .addCase(policesUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update policy";
      });
  },
});

export default policySlice.reducer;
export const { resetPolicy, resetStatus } = policySlice.actions;
