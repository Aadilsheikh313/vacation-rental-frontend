import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGuestRegisterApi, getTotalGuestRegisterApi } from "../../../api/AdimApi/adminGuestApi";



export const getTotalGuestRegister = createAsyncThunk(
    "adminposts/getTotalGuestRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getTotalGuestRegisterApi();           
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Admin Failed to all fetch  Guest Register");
        }
    }
);

export const getAllGuestRegister = createAsyncThunk(
    "adminposts/getAllGuestRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllGuestRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllGuestRegister");
        }
    }
);