// 📁 redux/reducers/reviewReducer.js
import { createSlice } from "@reduxjs/toolkit";
import { createReviewPosts, deleteReviewPosts, editReviewPosts, getAllReviewPosts } from "../action/reviewAction";

const initialState = {
  reviewPosts: [],            // All review data from backend
  reviewPostsId: "",          // Optional: for UI tracking (if needed)
  reviewPostsFetching: false, // Used to check if fetched
  isLoading: false,           // Loader for posting
  isError: false,             // If error occurs
  message: "",                // Message from response
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
      .addCase(deleteReviewPosts.pending, (state) => {
        state.isLoading = true;
        state.message = "....";
      })
      .addCase(deleteReviewPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;

        const deletedReviewId = action.meta.arg.reviewId;
        state.reviewPosts = state.reviewPosts.filter(r => r._id !== deletedReviewId);

        state.message = action.payload.message || "Review deleted successfully";
      })

      .addCase(deleteReviewPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete the review";
      })
  },
});

// ✅ Exports
export default reviewSlice.reducer;
export const { reset, resetReviewPostsId, resetStatus } = reviewSlice.actions;
