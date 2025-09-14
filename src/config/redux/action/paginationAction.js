import { createAsyncThunk } from "@reduxjs/toolkit";
import { PaginationApi } from "../../../api/pagenationApi";


export const PaginationActionPost = createAsyncThunk(
    "Page/PaginationActionPost",
    async ({ page = 1, limit = 1 }, thunkAPI) => {
        try {
            const response = await PaginationApi(page, limit);
            console.log("ACTION", page, limit);
            
            return { ...response.data, currentPage: page };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch properties");
        }
    }
)