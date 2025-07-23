import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminLoginApi, adminRegisterApi } from "../../../api/AdimApi/adminauthApi";



export const adminRegisterAction = createAsyncThunk(
    "admin/adminregister",
    async(admin, thunkAPI) =>{
        try {
            const data = await adminRegisterApi(admin);
            return thunkAPI.fulfillWithValue(data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error?.response?.data?.message || "AdminRegistration failed"); 
        }
    }
);

export const adminLoginAction = createAsyncThunk(
    "admin/adminlogin",
  async(credentials , thunkAPI) =>{
    try {
        const data = await adminLoginApi(credentials);
        return thunkAPI.fulfillWithValue(data);
    } catch (error) {
       return thunkAPI.rejectWithValue(error?.response?.data?.message || "Login failed");
      }
  }
)