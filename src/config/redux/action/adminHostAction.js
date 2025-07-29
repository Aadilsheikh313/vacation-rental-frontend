import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalHostRegisterApi } from "../../../api/AdimApi/adminHostApi";


export const getTotalHostRegister = createAsyncThunk(
    "adminposts/getTotalHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getTotalHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  Host Register");
        }
    }
);