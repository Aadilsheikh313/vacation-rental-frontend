import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllActiveHostRegisterApi, 
    getAllHostRegisterApi,
     getTotalHostRegisterApi 

} from "../../../api/AdimApi/adminHostApi";


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