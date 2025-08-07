import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostAdminApi, getApprovedPostAdminApi,
     PostAdminExperinceApi
     } from "../../../api/AdimApi/adminPostExperienceApi";

export const  getApprovedPostAdmin = createAsyncThunk(
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
    async(formData, thunkAPI) =>{
        try {
            const response = await PostAdminExperinceApi(formData);
            
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to post Admin Experience");
        }
    }
)