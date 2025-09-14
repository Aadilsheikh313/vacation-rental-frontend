import { createSlice } from "@reduxjs/toolkit";
import { PaginationActionPost } from "../action/paginationAction";

const initialState = {
  Page: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
  hasMore: false,
  totalPages: 1,
  currentPage: 1,
};

const pageSlice = createSlice({
  name: "Pages",
  initialState,
  reducers: {
    pagereset: () => initialState, // Reset full state
    PageresetStatus: (state) => {   // Reset status flags
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PaginationActionPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(PaginationActionPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Page = action.payload.properties;
        state.hasMore = action.payload.hasMore;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(PaginationActionPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch properties";
      });
  },
});

export const { pagereset, PageresetStatus } = pageSlice.actions;
export default pageSlice.reducer;
