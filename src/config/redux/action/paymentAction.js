import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRazorpayOrder, getRazorpayKeyApi, verifyRazorpayPayment } from "../../../api/paymentApi";
import { showError, showSuccess } from "../../../utils/toastUtils";

// 🔹 Create Razorpay Order
export const initiateRazorpayOrder = createAsyncThunk(
  "payment/initiateOrder",
  async ({ token, amount }, thunkAPI) => {
    try {
      const response = await createRazorpayOrder(token, amount);
      console.log("ACTIONORD", response);
      
      return response; 
    } catch (error) {
      showError("Failed to create order");
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

//🔹 Get Razorpay Key
export const getRazorpayKey = createAsyncThunk(
  "payment/getKey",
  async (token, thunkAPI) => {  
    try {
      const response = await getRazorpayKeyApi(token);
      console.log("ACTIONKEY", response);
      return response; 
    }
    catch (error) {
      showError("Failed to get Razorpay Key");
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// 🔹 Verify Razorpay Payment
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async ({ verifyData, token }, thunkAPI) => {
    try {
      const response = await verifyRazorpayPayment(token, verifyData);
      showSuccess("Payment Verified");
      return response;
    } catch (error) {
      showError("Payment Verification Failed");
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

