import { createSlice } from "@reduxjs/toolkit";
import {
    GetAllHostPendingAction,
    GetAllRejectHostAction,
    GetAllVerifedHostAction,
    ReverifiedAction,
    VerifyOrRejectHostAction
} from "../action/adminVerifedHostAction";


const initialState = {
    allPendingHost: [],
    allVerifed: [],
    allReject: [],
    verifyOrReject: null,
    Reverifeiy: null,
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
            state.Reverifeiy = null;
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
                state.message = `Host ${action.payload.host.verificationStatus === "verified" ? "verified" : "rejected"} successfully.`;
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
            //====================== Reverification =============================
            .addCase(ReverifiedAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Processing host Reverification...";
                state.isError = null;
            })
            .addCase(ReverifiedAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.Reverifeiy = action.payload.host || null;
                
                state.message = "Host reverified successfully.";

                const reverifiedHost = action.payload.host;

                // 1️⃣ Remove it from rejected list
                state.allReject = state.allReject.filter((h) => h._id !== reverifiedHost._id);

                // 2️⃣ Add it to verified list
                state.allVerifed = [reverifiedHost, ...state.allVerifed];
            })
             .addCase(ReverifiedAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload || "Failed to fetch Reverifiey hosts.";
            })

},
});

export const { resetPending } = AdminVerfRejPenSlice.actions;
export default AdminVerfRejPenSlice.reducer;
