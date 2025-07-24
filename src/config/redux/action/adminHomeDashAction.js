import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPropertyAdminApi, getSinglePropertyAdminApi } from "../../../api/AdimApi/adminHomeDash";


export const getAllPropertyAdminPosts = createAsyncThunk(
    "adminposts/getAllPropertyAdminPosts",
    async (_, thunkAPI) => {
        try {
            const response = await getAllPropertyAdminApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  posts");
        }
    }
);

export const getSinglePropertyAdminPosts = createAsyncThunk(
    "adminposts/getSinglePropertyAdminPosts",
    async(propertyId,thunkAPI ) =>{
        try {
            const response = await getSinglePropertyAdminApi(propertyId);
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
           return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to get a single fetch  posts"); 
        }
    }
)
