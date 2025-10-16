import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../action/authAction";

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const hostFromStorage = localStorage.getItem("host")
  ? JSON.parse(localStorage.getItem("host"))
  : null;

const initialState = {
  user: userFromStorage,
  host: hostFromStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: !!userFromStorage,
  token: localStorage.getItem("token") || null,
  message: "",
  isTokenThere: !!localStorage.getItem("token"),
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    handleLogoutUser: (state) => {
      state.user = null;
      state.loggedIn = false;
      state.token = null;
      state.isTokenThere = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "Logged out successfully";
      localStorage.removeItem("user");
      localStorage.removeItem("host");
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
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Registering user...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = false;
        state.message = "Registration successful. Please log in.";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Logging in...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = true;

        // Save both user and host if available
        state.user = action.payload.user;
        state.host = action.payload.host || null;
        state.token = action.payload.token;
        state.message = "Login successful";

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        if (action.payload.host) {
          localStorage.setItem("host", JSON.stringify(action.payload.host));
        }
        localStorage.setItem("token", action.payload.token);
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

  },
});

export const {
  reset,
  emptyMessage,
  setTokenIsThere,
  setTokenIsNotThere,
  handleLogoutUser,
} = authSlice.actions;

export default authSlice.reducer;
