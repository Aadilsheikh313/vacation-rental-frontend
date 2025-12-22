// 📁 redux/reducers/reviewReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createReviewPosts,
  editReviewPosts,
  getAdminReviewAnalytics,
  getAllReviewPosts,
  getReviewAnalytics,
  hostReplyToReview,
  toggleReviewVisibility
} from "../action/reviewAction";

const initialState = {
  reviewPosts: [],            // All review data from backend
  reviewPostsId: "",          // Optional: for UI tracking (if needed)
  analytics: null,
  reviewPostsFetching: false, // Used to check if fetched
  isLoading: false,           // Loader for posting
  isError: false,             // If error occurs
  message: "",
  alreadyReviewed: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reset: () => initialState, // ✅ Fully reset the reducer state

    resetReviewPostsId: (state) => {
      state.reviewPostsId = ""; // Optional helper
    },

    resetStatus: (state) => {
      state.message = "";
      state.isError = false;
      state.isLoading = false;
    },
    resetReviewStatus: (state) => {
      state.alreadyReviewed = false;
      state.message = "";
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReviewPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Get  review..."
      })
      .addCase(getAllReviewPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.reviewPostsFetching = true;
        state.reviewPosts = action.payload.reviews; // ✅ Set reviews
        state.message = "Fetched reviews successfully";
      })
      .addCase(getAllReviewPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to post review.";
      })
      .addCase(createReviewPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "Posting your review...";
      })
      .addCase(createReviewPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.reviewPostsFetching = true;
        state.reviewPosts.push(action.payload.review); // Push single review
        state.message = action.payload.message || "Review posted successfully";
        if (action.payload === "You have already reviewed this property") {
          state.alreadyReviewed = true; // ✅ trigger modal
        }

      })
      .addCase(createReviewPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to post review.";
      })
      .addCase(editReviewPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "....";
      })
      .addCase(editReviewPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        const updatedReview = action.payload.review;
        const index = state.reviewPosts.findIndex(r => r._id === updatedReview._id);

        if (index !== -1) {
          state.reviewPosts[index] = updatedReview;
        }

        state.message = action.payload.message || "Review edited successfully";
      })

      .addCase(editReviewPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to edit Review";
      })
      .addCase(hostReplyToReview.pending, (state) => {
        state.isLoading = true;
        state.message = "....";
      })
      .addCase(hostReplyToReview.fulfilled, (state, action) => {
        const updated = action.payload.review;
        const index = state.reviewPosts.findIndex(
          (r) => r._id === updated._id
        );

        if (index !== -1) {
          state.reviewPosts[index] = updated;
        }
      })
      .addCase(hostReplyToReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to host reply Review";
      })
      /* ================================
     REVIEW ANALYTICS (HOST)
  ================================ */
      .addCase(getReviewAnalytics.pending, (state) => {
        state.isLoading = true;
        state.message = "....";
      })
      .addCase(getReviewAnalytics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.analytics = action.payload;
      })
      .addCase(getReviewAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Analytics Review";
      })
      /* ================================
   REVIEW ANALYTICS (ADMIN)
================================ */
      .addCase(getAdminReviewAnalytics.pending, (state) => {
        state.isLoading = true;
        state.message = "....";
      })
      .addCase(getAdminReviewAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload.analytics;
      })
      .addCase(getAdminReviewAnalytics.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to Admin Analytics Review";
      })
      /* ================================
    ADMIN: HIDE / UNHIDE REVIEW
 ================================ */
      .addCase(toggleReviewVisibility.pending, (state) => {
        state.isLoading = true;
        state.message = "....";
      })
      .addCase(toggleReviewVisibility.fulfilled, (state, action) => {
        const updated = action.payload.review;
        const index = state.reviewPosts.findIndex(
          (r) => r._id === updated._id
        );

        if (index !== -1) {
          state.reviewPosts[index] = updated;
        }
      })
      .addCase(toggleReviewVisibility.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Failed to Admin Hide/Unhide Review";
      })

  },
});

// ✅ Exports
export default reviewSlice.reducer;
export const { reset, resetReviewPostsId, resetStatus, resetReviewStatus } = reviewSlice.actions;
