import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  admineditPostApi, getAllPostAdminApi, getApprovedPostAdminApi,
  getSinglePostAdminApi,
  PostAdminExperinceApi,
  reApprovedPostAdminApi
} from "../../../api/AdimApi/adminPostExperienceApi";

export const getApprovedPostAdmin = createAsyncThunk(
  "adminposts/getApprovedPostAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await getApprovedPostAdminApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

export const getAllPostAdmin = createAsyncThunk(
  "adminposts/getAllPostAdmin",
  async (_, thunkAPI) => {
    try {
      const response = await getAllPostAdminApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);


export const adminPostExperience = createAsyncThunk(
  "adminPost/adminPostExperience",
  async (formData, thunkAPI) => {
    try {
      const response = await PostAdminExperinceApi(formData);

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to post Admin Experience");
    }
  }
);

export const getSinglePostAdmin = createAsyncThunk(
  "adminposts/getSinglePostAdmin",
  async (PostId, thunkAPI) => {
    try {
      const response = await getSinglePostAdminApi(PostId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to get single post admin";
      return thunkAPI.rejectWithValue(message); // ✅ string only
    }
  }
);

export const admineditPosts = createAsyncThunk(
  "adminposts/admineditPosts",
  async ({ id, updatedData, token }, thunkAPI) => {
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing before making API call!");
    }

    try {
      const response = await admineditPostApi(id, updatedData, token); // ✅ Passed token

      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to admin edit post";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reApprovedPostAdminPosts = createAsyncThunk(
  "adminposts/reApprovedPostAdminPosts",
  async ({ id, token }, thunkAPI) => {
    if (!token) {
      throw new Error("Token is missing before making API call!");
    }
    try {
      const response = await reApprovedPostAdminApi(id, token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed the Reactive Property")
    }
  }
)

