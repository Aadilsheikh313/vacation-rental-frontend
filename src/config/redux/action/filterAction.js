import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilterRoomsApi, PricesBaseFilterApi } from "../../../api/filterApi";



export const PricesBaseFilterPost = createAsyncThunk(
    "filter/PricesBaseFilterPost",
    async(sortValue , thunkAPI) =>{
        try {
            const response = await PricesBaseFilterApi(sortValue);
            return response; 
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to get filter Prices property");
        }
    }
)

export const RoomFilterPost = createAsyncThunk(
    "filter/RoomFilterPost",
        async (filters, thunkAPI) => {
            try {
                const response = await FilterRoomsApi(filters);
                return response;
            } catch (error) {
                return thunkAPI.rejectWithValue(error.response?.data || "Failed to Post filter Apply property");
            }
        }
)