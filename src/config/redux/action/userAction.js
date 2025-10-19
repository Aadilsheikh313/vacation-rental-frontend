import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfileApi, userProfileApi } from "../../../api/userApi";

// ✅ GET User Profile
export const userProfileAction = createAsyncThunk(
    'profile/userProfileAction',
    async (tokenObj, thunkAPI) => {
        try {
            const response = await userProfileApi(tokenObj);
            if (!response) {
                return thunkAPI.rejectWithValue("Failed to fetch user profile");
            }
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch user profile"
            )
        }
    }
)

// ✅ Update user profile action
export const userProfileUpdateAction = createAsyncThunk(
    'profile/userProfileUpdateAction',
    async ({tokenObj, formData}, thunkAPI) => {
        try {
            const response = await updateUserProfileApi(tokenObj, formData);
            if (!response) {
                return thunkAPI.rejectWithValue("Failed to update user profile");
            }
            // ✅ UPDATED: Ensure host is always updated in state
            return thunkAPI.fulfillWithValue({
                user: response.user,
                host: response.host
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to update user profile"
            );
        }
    }
);
