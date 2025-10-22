import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllHostPendingApi } from "../../../api/AdimApi/adminVerifedHostApi";


export const GetAllHostPendingAction = createAsyncThunk(
    "verify/GetAllHostPendingAction",
    async (_, thunkAPI) => {
        try {
            const response = await GetAllHostPendingApi();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            console.error("❌ Redux Thunk Error (Pending Hosts):", error);

            // ✅ Use correct property name: error.response (not error.respose)
            const errorMessage =
                error.response?.data?.message ||
                error.message ||
                "Admin failed to fetch all pending host registrations.";

            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);
