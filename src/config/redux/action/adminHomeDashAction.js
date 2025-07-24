import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPropertyAdminApi } from "../../../api/AdimApi/adminHomeDash";


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
