  import { createSlice } from "@reduxjs/toolkit";
  import { getAllPosts, createPosts, getSinglePosts, editPropertyPosts, getMyPropertiesPosts, softdeletePropertyPosts, harddeletePropertyPosts, reactivePropertyPosts, getMyExpiredPropertyPosts, getPropertyByCategoryPosts } from "../action/propertyAction";

  const initialState = {
    posts: [],
    hostDashboardPosts: [],
    editPosts: null,
    singlePost: null,
    isError: false,
    isSuccess: false,
    postFetched: false,
    isLoading: false,
    loggedIn: false,
    hostDashboardLoading: false,
    message: "",
    comments: [],
    postId: "",
  };

  const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      reset: () => initialState,
      resetPostId: (state) => {
        state.postId = "";
      },
      resetSinglePost: (state) => {
        state.singlePost = null;
      },
      resetEditPost: (state) => {
        state.editPosts = null;
      },
      resethostDashboardPosts: (state) => {
        state.hostDashboardPosts = [];
      },
      resetHostDashboardLoading: (state) => {
        state.hostDashboardLoading = false;
      },

      resetStatus: (state) => {
        state.message = "";
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
      },

    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Fetching all the posts ...";
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.postFetched = true;
          state.posts = action.payload.property.reverse() || []; // ✅ FIXED
        })
        .addCase(getAllPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(createPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Wait a post time";
        })
        .addCase(createPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.isSuccess = true;
          state.postFetched = true;
          state.posts.unshift(action.payload.newproperty); // ✅ Add new post
          console.log("ACTIONREDUCER",action.payload.newproperty);
          
        })
        .addCase(createPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getSinglePosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Fetching single post...";
        })
        .addCase(getSinglePosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.postFetched = true;
          state.singlePost = action.payload.property;
          state.message = "Single post fetched successfully";
        })
        .addCase(getSinglePosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(editPropertyPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Fetching edit post ...";
        })
        .addCase(editPropertyPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.postFetched = true;
          state.editPosts = action.payload.property;
          state.message = "Successfully edit the post";

          // ✅ Also update the post in state.posts array
          const index = state.posts.findIndex(p => p._id === action.payload.property._id);
          if (index !== -1) {
            state.posts[index] = action.payload.property;
          }
        })
        .addCase(editPropertyPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(softdeletePropertyPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Soft Deleting post...";
        })
        .addCase(softdeletePropertyPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.message = action.payload.message;

          // ✅ Remove the deleted post from posts
          state.posts = state.posts.filter(p => p._id !== action.meta.arg.id);
        })
        .addCase(softdeletePropertyPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || "Soft Delete failed";
        })
        .addCase(harddeletePropertyPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Hard Deleting post...";
        })
        .addCase(harddeletePropertyPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.message = action.payload.message;

          // ✅ Remove the deleted post from posts
          state.posts = state.posts.filter(p => p._id !== action.meta.arg.id);
        })
        .addCase(harddeletePropertyPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || "Delete failed";
        })
        //Reactive property code 
        .addCase(reactivePropertyPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Reactivating property...";
        })
        .addCase(reactivePropertyPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.message = "Property reactivated successfully!";

          const updatedProperty = action.payload.property;

          const index = state.posts.findIndex(p => p._id === updatedProperty._id);
          if (index !== -1) {
            state.posts[index] = updatedProperty;
          }

          const hostIndex = state.hostDashboardPosts.findIndex(p => p._id === updatedProperty._id);
          if (hostIndex !== -1) {
            state.hostDashboardPosts[hostIndex] = updatedProperty;
          }
        })
        .addCase(reactivePropertyPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload || "Reactive property failed";
        })

        // Get all properties of the onwer host
        .addCase(getMyPropertiesPosts.pending, (state) => {
          state.hostDashboardLoading = true;
        })
        .addCase(getMyPropertiesPosts.fulfilled, (state, action) => {
          state.hostDashboardLoading = false;
          state.isError = false;
          state.message = action.payload.message; 
          state.hostDashboardPosts = action.payload;
        })
        .addCase(getMyPropertiesPosts.rejected, (state, action) => {
          state.hostDashboardLoading = false;
          state.isError = true;
          state.message = action.payload || "Get host properties failed";
        })
        .addCase(getMyExpiredPropertyPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Fetching expired properties...";
        })
        .addCase(getMyExpiredPropertyPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.postFetched = true;
          state.posts = action.payload.property;
        })
        .addCase(getMyExpiredPropertyPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })
        .addCase(getPropertyByCategoryPosts.pending, (state) => {
          state.isLoading = true;
          state.message = "Fetching properties by category...";
        })
        .addCase(getPropertyByCategoryPosts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isError = false;
          state.postFetched = true;
        state.posts = action.payload || [];
        })
        .addCase(getPropertyByCategoryPosts.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })

    },
  });

  export default postSlice.reducer;
  export const { reset, resetPostId, resetSinglePost, resetEditPost, resethostDashboardPosts, resetStatus } = postSlice.actions;
