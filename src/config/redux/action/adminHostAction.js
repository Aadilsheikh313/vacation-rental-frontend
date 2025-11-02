import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllActiveHostRegisterApi, 
    getAllBannedHostRegisterApi, 
    getAllHostRegisterApi,
     getAllLogoutHostRegisterApi,
     getAllNewHostRegisterApi,
     getAllOnlineHostRegisterApi,

} from "../../../api/AdimApi/adminHostApi";

export const getAllHostRegister = createAsyncThunk(
    "adminposts/getAllHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllHostRegister");
        }
    }
);

export const getAllActiveHostRegister = createAsyncThunk(
    "adminposts/getAllActiveHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllActiveHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllActvieHostRegister");
        }
    }
);

export const getAllOnlineHostRegister = createAsyncThunk(
    "adminposts/getAllOnlineHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllOnlineHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllOnlineHostRegister");
        }
    }
);
export const getAllNewHostRegister = createAsyncThunk(
    "adminposts/getAllNewHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllNewHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllNewHostRegister");
        }
    }
);

export const getAllLogoutHostRegister = createAsyncThunk(
    "adminposts/getAllLogoutHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllLogoutHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllLogoutHostRegister");
        }
    }
);

export const getAllBannedHostRegister = createAsyncThunk(
    "adminposts/getAllBannedHostRegister",
    async (_, thunkAPI) => {
        try {
            const response = await getAllBannedHostRegisterApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Error in getAllBannedHostRegister");
        }
    }
);