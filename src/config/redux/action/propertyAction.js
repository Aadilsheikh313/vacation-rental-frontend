import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  editPropertyApi, getAllPropertyPostedApi, getMyPropertiesApi,
  getSinglePropertyApi, harddeletedPropertyApi, postPropertyApi, reactivePropertyApi,
  softdeletedPropertyApi
} from "../../../api/propertyApi";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const response = await getAllPropertyPostedApi();
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch posts");
    }
  }
);

export const createPosts = createAsyncThunk(
  "posts/createPosts",
  async (formData, thunkAPI) => {
    try {
      const response = await postPropertyApi(formData);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to post property");
    }
  }
);

export const getSinglePosts = createAsyncThunk(
  "posts/getSinglePosts",
  async (id, thunkAPI) => {
    try {
      const response = await getSinglePropertyApi(id);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to get single property");
    }
  }
);

export const editPropertyPosts = createAsyncThunk(
  "posts/editPropertyPosts",
  async ({ id, updatedData, token }, thunkAPI) => {
    // console.log("🔥 token being sent:", token);
    if (!token) {
      throw new Error("Token is missing before making API call!");
    }

    try {
      const response = await editPropertyApi(id, updatedData, token); // ✅ Use passed token only
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to edit property");
    }
  }
);

export const softdeletePropertyPosts = createAsyncThunk(
  "posts/softdeletePropertyPosts",
  async ({ id, token }, thunkAPI) => {
    if (!token) {
      throw new Error("Token is missing before making API call!");
    }
    try {
      const response = await softdeletedPropertyApi(id, token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed the deleted property");
    }
  }
)
export const harddeletePropertyPosts = createAsyncThunk(
  "posts/harddeletePropertyPosts",
  async ({ id, token }, thunkAPI) => {
    if (!token) {
      throw new Error("Token is missing before making API call!");
    }
    try {
      const response = await harddeletedPropertyApi(id, token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed the deleted property");
    }
  }
)

export const reactivePropertyPosts = createAsyncThunk(
  "posts/reactivePropertyPosts",
  async ({ id, token }, thunkAPI) => {
    if (!token) {
      throw new Error("Token is missing before making API call!");
    }
    try {
      const response = await reactivePropertyApi(id, token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed the Reactive Property")
    }
  }
)

export const getMyPropertiesPosts = createAsyncThunk(
  "posts/getMyPropertiesPosts",
  async (_, thunkAPI) => {
    try {
      const response = await getMyPropertiesApi();
      return thunkAPI.fulfillWithValue(response.properties); // extract the actual data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch the host properties"
      );
    }
  }
);
export const getMyExpiredPropertyPosts = createAsyncThunk(
  "posts/getMyExpiredPropertyPosts",
  async({token}, thunkAPI) =>{
    try {
      const response = await getAllPropertyPostedApi(token);
      return thunkAPI.fulfillWithValue(response.property);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch the expired property"
      )
    }
  }
)


