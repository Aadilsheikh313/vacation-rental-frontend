import { createSlice } from "@reduxjs/toolkit";
import {
    GetAllHostPendingAction,
    GetAllRejectHostAction,
    GetAllVerifedHostAction,
    VerifyOrRejectHostAction
} from "../action/adminVerifedHostAction";


const initialState = {
    allPendingHost: [],
    allVerifed: [],
    allReject: [],
    verifyOrReject: null,
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
            state.allVerifed = [];
            state.allReject = [];
            state.TotalPending = 0;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // =================== Get All Pending Hosts ===================
            .addCase(GetAllHostPendingAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all pending host registrations...";
            })
            .addCase(GetAllHostPendingAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allPendingHost = action.payload.hosts || [];
                state.TotalPending = action.payload.totalPending || 0;
                state.message = "Pending hosts fetched successfully.";
            })
            .addCase(GetAllHostPendingAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch pending hosts.";
            })
            // =================== Verify or Reject Host ===================
            .addCase(VerifyOrRejectHostAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Processing host verification...";
                state.isError = null;
            })
            .addCase(VerifyOrRejectHostAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.verifyOrReject = action.payload.host || null;
                state.message = `Host ${action.payload.host.status === "verified" ? "verified" : "rejected"} successfully.`;
                //this line autmatice remove ke pending user 
                state.allPendingHost = state.allPendingHost.filter(
                    (h) => h._id !== action.payload.host?._id
                );
                // 🔢 Decrease total pending count dynamically (never go below 0)
                state.TotalPending = Math.max(0, state.TotalPending - 1);
            })
            .addCase(VerifyOrRejectHostAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch pending hosts.";
            })

            // =================== Get All Verify  Host ===================
            .addCase(GetAllVerifedHostAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all verifed host registrations...";
            })
            .addCase(GetAllVerifedHostAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allVerifed = action.payload.hosts || [];
                state.message = "Verifed hosts fetched successfully.";
            })
            .addCase(GetAllVerifedHostAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch verifed hosts.";
            })
              // =================== Get All Reject  Host ===================
            .addCase(GetAllRejectHostAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Fetching all rejcted host registrations...";
            })
            .addCase(GetAllRejectHostAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.allReject = action.payload.hosts || [];
                state.message = "Rejected hosts fetched successfully.";
            })
            .addCase(GetAllRejectHostAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch Rejected hosts.";
            })
    },
});

export const { resetPending } = AdminVerfRejPenSlice.actions;
export default AdminVerfRejPenSlice.reducer;
