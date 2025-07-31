import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, userProfileApi } from "../../../api/authApi";




export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const data = await registerApi(user);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await loginApi(credentials);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const status = error?.response?.status;
      const message = error?.response?.data?.message || "Login failed";

      if (status === 403) {
        // User is banned
        return thunkAPI.rejectWithValue("Your account has been banned.");
      }
      return thunkAPI.rejectWithValue(message);

    }
  }
);

export const getUser = createAsyncThunk(
  "auth/userProfile",
  async (user, thunkAPI) => {
    // console.log("Thunk received token:", user);
    try {
      const data = await userProfileApi(user); // token object passed
      console.log("User data from API:", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      const status = error.response?.status;

      if (status === 403) {
        // Banned user — force logout
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return thunkAPI.rejectWithValue("Your account has been banned.");
      }

      return thunkAPI.rejectWithValue(error.response?.data || "Unauthorized");
    }

  }
)

