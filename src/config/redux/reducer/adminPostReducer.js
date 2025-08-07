import { createSlice } from "@reduxjs/toolkit";
import { adminPostExperience, getAllPostAdmin, getApprovedPostAdmin } from "../action/adminPostAction";

// ✅ Initial state
const initialState = {
  adminPosts: [],
   approvedPosts: [],
   allAdminPosts: [],
  totalPosts: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  adminPostId: "",
};

// ✅ Create slice
const adminPostSlice = createSlice({
  name: "adminPost",
  initialState,

  reducers: {
    // ✅ Reset the entire slice
    reset: () => initialState,

    // ✅ Reset only post ID
    resetAdminPostId: (state) => {
      state.adminPostId = "";
    },

    // ✅ Reset only status flags
    resetStatus: (state) => {
      state.approvedPosts = [];
        state.allAdminPosts = [];
      state.totalPosts = 0;
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(adminPostExperience.pending, (state) => {
        state.isLoading = true;
        state.message = "Posting experience, please wait...";
      })

      .addCase(adminPostExperience.fulfilled, (state, action) => {
        const newPost = action.payload?.adminposts;
        if (newPost) {
          state.adminPosts.unshift(newPost); // ✅ Add new post to top
          state.adminPostId = newPost._id || "";
        }
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "Post created successfully!";
      })

      .addCase(adminPostExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Something went wrong!";
      })
      .addCase(getApprovedPostAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Loading approved posts...";
      })

      .addCase(getApprovedPostAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.approvedPosts = action.payload?.approvedPosts || [];
        state.message = "Approved posts fetched successfully!";
      })

      .addCase(getApprovedPostAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch approved posts!";
      })
      .addCase(getAllPostAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching all posts...";
      })

      .addCase(getAllPostAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allAdminPosts = action.payload?.adminPosts || [];
        state.totalPosts = action.payload?.totalPosts || 0;
        state.message = "All admin posts fetched successfully!";
      })

      .addCase(getAllPostAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch all admin posts!";
      });
  },
});

// ✅ Export reducer and actions
export default adminPostSlice.reducer;
export const {
  reset,
  resetAdminPostId,
  resetStatus,
} = adminPostSlice.actions;
