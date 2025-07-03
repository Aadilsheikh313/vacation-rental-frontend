import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteReviewApi, editReviewApi, getAllReviewApi, postReviewApi } from "../../../api/reviewApi";

// ✅ GET All Reviews for a Property 
export const getAllReviewPosts = createAsyncThunk(
  "review/getAllReviewPosts",
  async (propertyId, thunkAPI) => {
    try {
      const response = await getAllReviewApi(propertyId);  // 🛠️ FIXED: pass propertyId
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch all reviews"
      );
    }
  }
);

// ✅ POST Review for a Property 
export const createReviewPosts = createAsyncThunk(
  "review/createReviewPosts",
  async ({ propertyId, token, rating, comment }, thunkAPI) => {
    try {
      const response = await postReviewApi({ propertyId, token, rating, comment });
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to post the review!"
      );
    }
  }
);

export const editReviewPosts = createAsyncThunk(
  "review/editReviewPosts",
  async({ propertyId, reviewId, token, rating, comment }, thunkAPI) => {
    try {
      const response = await editReviewApi({ propertyId, reviewId, token, rating, comment });
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to edit Review!"
      );
    }
  }
);

export const deleteReviewPosts = createAsyncThunk(
  "review/deleteReviewPosts",
  async({ propertyId, reviewId, token }, thunkAPI) => {
    try {
      const response = await deleteReviewApi({ propertyId, reviewId, token });
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete Review!"
      );
    }
  }
);
