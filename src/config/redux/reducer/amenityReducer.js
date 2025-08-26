import { createSlice } from "@reduxjs/toolkit";
import { amenitiesPost, amenitiesGet, amenitiesUpdate } from "../action/amenityAction";

const initialState = {
  amenities: null,   // single property ke amenities
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const amenitySlice = createSlice({
  name: "amenity",
  initialState,
  reducers: {
    resetAmenity: () => initialState, // sab reset
    resetStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Post Amenities
      .addCase(amenitiesPost.pending, (state) => {
        state.isLoading = true;
        state.message = "Posting amenities...";
      })
      .addCase(amenitiesPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.amenities = action.payload.data?.newAmenity || action.payload.data; 
        state.message = action.payload.message || "Amenities posted successfully";
      })
      .addCase(amenitiesPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to post amenities";
      })

      // ✅ Get Amenities
      .addCase(amenitiesGet.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching amenities...";
      })
      .addCase(amenitiesGet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.amenities = action.payload.data?.amenities || action.payload.data; 
        state.message = action.payload.message || "Amenities fetched successfully";
      })
      .addCase(amenitiesGet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch amenities";
      })

      // ✅ Update Amenities
      .addCase(amenitiesUpdate.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating amenities...";
      })
      .addCase(amenitiesUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.amenities = action.payload.data || state.amenities;
        state.message = action.payload.message || "Amenities updated successfully";
      })
      .addCase(amenitiesUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update amenities";
      });
  },
});

export default amenitySlice.reducer;
export const { resetAmenity, resetStatus } = amenitySlice.actions;
