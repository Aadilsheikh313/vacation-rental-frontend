import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllReviewApi,
  postReviewApi,
  editReviewApi,
  hostReplyToReviewApi,
  getReviewAnalyticsApi,
  toggleReviewVisibilityApi,
  getAdminReviewAnalyticsApi,
} from "../../../api/reviewApi";

/* =====================================
   GET ALL REVIEWS (PUBLIC)
===================================== */
export const getAllReviewPosts = createAsyncThunk(
  "review/getAllReviewPosts",
  async (propertyId, thunkAPI) => {
    try {
      const response = await getAllReviewApi(propertyId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews"
      );
    }
  }
);

/* =====================================
   CREATE REVIEW (GUEST)
===================================== */
export const createReviewPosts = createAsyncThunk(
  "review/createReviewPosts",
  async (
    { propertyId, token, rating, comment, cleanliness, comfort, service, location },
    thunkAPI
  ) => {
    try {
      const response = await postReviewApi({
        propertyId,
        token,
        rating,
        comment,
        cleanliness,
        comfort,
        service,
        location,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to post review"
      );
    }
  }
);

/* =====================================
   EDIT REVIEW
===================================== */
export const editReviewPosts = createAsyncThunk(
  "review/editReviewPosts",
  async (
    { reviewId, token, rating, comment, cleanliness, comfort, service, location },
    thunkAPI
  ) => {
    try {
      const response = await editReviewApi({
        reviewId,
        token,
        rating,
        comment,
        cleanliness,
        comfort,
        service,
        location,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to edit review"
      );
    }
  }
);

/* =====================================
   HOST REPLY
===================================== */
export const hostReplyToReview = createAsyncThunk(
  "review/hostReplyToReview",
  async ({ reviewId, token, message }, thunkAPI) => {
    try {
      const response = await hostReplyToReviewApi({
        reviewId,
        token,
        message,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reply to review"
      );
    }
  }
);

/* =====================================
   REVIEW ANALYTICS
===================================== */
export const getReviewAnalytics = createAsyncThunk(
  "review/getReviewAnalytics",
  async ({ propertyId, token }, thunkAPI) => {
    try {
      const response = await getReviewAnalyticsApi({ propertyId, token });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to load analytics"
      );
    }
  }
);


/* =====================================
   ADMIN: getAdminReviewAnalytics
===================================== */

export const getAdminReviewAnalytics = createAsyncThunk(
  "review/getAdminReviewAnalytics",
  async({ propertyId,
  token,}, thunkAPI) =>{
    try {
      const response = await getAdminReviewAnalyticsApi({
        propertyId, token
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to getAdminReviewAnalytics"
      );
    }
  }
)

/* =====================================
   ADMIN: HIDE / UNHIDE REVIEW
===================================== */
export const toggleReviewVisibility = createAsyncThunk(
  "review/toggleReviewVisibility",
  async ({ reviewId, token, isHidden, reason }, thunkAPI) => {
    try {
      const response = await toggleReviewVisibilityApi({
        reviewId,
        token,
        isHidden,
        reason,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update review visibility"
      );
    }
  }
);
