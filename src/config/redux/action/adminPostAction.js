import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostAdminExperinceApi } from "../../../api/AdimApi/adminPostExperienceApi";


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