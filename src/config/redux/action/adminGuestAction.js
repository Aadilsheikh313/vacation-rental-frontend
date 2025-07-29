import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTotalGuestRegisterApi } from "../../../api/AdimApi/adminGuestApi";



export const getTotalGuestRegister = createAsyncThunk(
    "adminposts/getTotalHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getTotalGuestRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  Guest Register");
        }
    }
);