import { createSlice } from "@reduxjs/toolkit"
import { userProfileAction } from "../action/userAction"


const initialState = {
    userProfile: null,
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
        .addCase(userProfileAction.pending, (state) =>{
            state.isLoading = true;
            state.message = "Loading user profile...";
        })
        .addCase(userProfileAction.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.userProfile = action.payload;
            state.message = "User profile loaded successfully";
        })
        .addCase(userProfileAction.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload || "Failed to load user profile";
            state.userProfile = null;
        })
    }
})

export const { profilereset} = userSlice.actions;
export default userSlice.reducer;