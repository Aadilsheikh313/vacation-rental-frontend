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
        return thunkAPI.rejectWithValue(error?.response?.data?.message || "Login failed");
      }
    }
);

export const getUser = createAsyncThunk(
  "auth/userProfile",
  async(user, thunkAPI) =>{
    // console.log("Thunk received token:", user);
    try {
      const data = await userProfileApi(user); // token object passed
       console.log("User data from API:", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Unauthorized");
    }
  }
)

