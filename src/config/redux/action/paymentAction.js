
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRazorpayOrder, verifyRazorpayPayment } from "../../../api/paymentApi";
import { showError, showSuccess } from "../../../utils/toastUtils";

// 🔹 Create Razorpay Order
export const initiateRazorpayOrder = createAsyncThunk(
  "payment/initiateOrder",
  async ({ token, amount }, thunkAPI) => {
    try {
      const response = await createRazorpayOrder(token, amount);
      return response; // API returns { order: { ... } }
    } catch (error) {
      showError("Failed to create order");
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 🔹 Verify Razorpay Payment
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async ({ token, payload }, thunkAPI) => {
    try {
      const response = await verifyRazorpayPayment(token, payload);
      showSuccess("Payment Verified");
      return response;
    } catch (error) {
      showError("Payment Verification Failed");
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
