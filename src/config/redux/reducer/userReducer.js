import { createSlice } from "@reduxjs/toolkit"
import { userProfileAction, userProfileUpdateAction } from "../action/userAction"


const initialState = {
    userProfile: null,
    updateuserProfile: null,
    Host: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
}

const userSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {
        profilereset: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            // ✅ GET User Profile
            .addCase(userProfileAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Loading user profile...";
            })
            .addCase(userProfileAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.userProfile = action.payload.user;
                state.Host = action.payload.host
                state.message = "User profile loaded successfully";
            })
            .addCase(userProfileAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to load user profile";
                state.userProfile = null;
            })
            // ✅ UPDATE User Profile
            .addCase(userProfileUpdateAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Updating user profile...";
            })
            .addCase(userProfileUpdateAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.updateuserProfile = action.payload.user;
                state.userProfile = action.payload;
                state.message = "User profile updated successfully";
            })
            .addCase(userProfileUpdateAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Failed to load user profile";
                state.updateuserProfile = null;

            })
    }
})

export const { profilereset } = userSlice.actions;
export default userSlice.reducer;