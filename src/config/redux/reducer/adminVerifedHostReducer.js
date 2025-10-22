import { createSlice } from "@reduxjs/toolkit";
import { GetAllHostPendingAction } from "../action/adminVerifedHostAction";


const initialState = {
    allPendingHost: [],
    TotalPending: 0,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

const AdminVerfRejPenSlice = createSlice({
    name: "verifyRejectPending",
    initialState,
    reducers: {
        resetPending: (state) => {
            state.allPendingHost = [];
            state.TotalPending = 0;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllHostPendingAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all pending host registrations...";
            })
            .addCase(GetAllHostPendingAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allPendingHost = action.payload.hosts || [];
                console.log("ALL PENDING", action.payload.hosts);
                
                state.TotalPending = action.payload.totalPending || 0;
                state.message = "Pending hosts fetched successfully.";
            })
            .addCase(GetAllHostPendingAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch pending hosts.";
            });
    },
});

export const { resetPending } = AdminVerfRejPenSlice.actions;
export default AdminVerfRejPenSlice.reducer;
