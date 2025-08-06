import { createSlice } from "@reduxjs/toolkit";
import { adminLoginAction, adminRegisterAction } from "../action/adminAuthAction";



const adminFromStorage = localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null;

const initialState = {
    admin: adminFromStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    loggedIn: !!adminFromStorage,
    token: localStorage.getItem("token") || null,
    message: "",
    isTokenThere: !!localStorage.getItem("token"),
};

const adminAuthSlice = createSlice({
    name: "adminAuth",
    initialState,
    reducers: {
        reset: () => initialState,
        logoutAdmin: (state) => {
            state.admin = null;
            state.loggedIn = false;
            state.message = "Logged out sucessfully";
            localStorage.removeItem("admin");
            localStorage.removeItem("token");
        },
        emptyMessage: (state) => {
            state.message = "";
        },
        setTokenIsThere: (state) => {
            state.isTokenThere = true;
        },
        setTokenIsNotThere: (state) => {
            state.isTokenThere = false;
        },
    },
    extraReducers: (builder) => {
        builder
            //Admin Register
            .addCase(adminRegisterAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Adimn Register ...."
            })
            .addCase(adminRegisterAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loggedIn = false;
                state.message = "Admin Registration successful. Please log in.";
            })
            .addCase(adminRegisterAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // AdminLogin
            .addCase(adminLoginAction.pending, (state) => {
                state.isLoading = true;
                state.message = "Logging in...";
            })
            .addCase(adminLoginAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.loggedIn = true;
                state.admin = action.payload.admin;
                state.token = action.payload.token;
                console.log("ADIM RE", action.payload.admin);
                console.log("ADIM RETOKEH", action.payload.token);
                state.message = "Admin Login successful";
                localStorage.setItem("admin", JSON.stringify(action.payload.admin));
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(adminLoginAction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

    }
});

export const {
    logoutAdmin,
    reset,
    emptyMessage,
    setTokenIsThere,
    setTokenIsNotThere,
} = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
