// redux/actions/paymentAction.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createEditExtraPaymentOrderApi,
  createRazorpayOrder,
  getPaymentStatusApi,
  getRazorpayKeyApi,
  verifyEditExtraPaymentApi,
  verifyRazorpayPayment,
} from "../../../api/paymentApi";
import { showError, showSuccess } from "../../../utils/toastUtils";

/**
 * Get Razorpay Public Key
 */
export const getRazorpayKey = createAsyncThunk(
  "payment/getKey",
  async (token, thunkAPI) => {
    try {
      const response = await getRazorpayKeyApi(token);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      showError(error?.message || "Failed to fetch Razorpay key");
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

/**
 * Create Razorpay Order
 */
export const initiateRazorpayOrder = createAsyncThunk(
  "payment/initiateOrder",
  async ({ token, bookingId }, thunkAPI) => {
    try {
      const response = await createRazorpayOrder(token, bookingId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      showError(error?.message || "Failed to create order");
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

/**
 * Verify Razorpay Payment and confirm booking
 */
export const verifyPayment = createAsyncThunk(
  "payment/verify",
  async ({ token, verifyData }, thunkAPI) => {
    try {
      const response = await verifyRazorpayPayment(token, verifyData);
      showSuccess("Payment Verified Successfully 🎉");
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      showError(error?.message || "Payment verification failed");
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

export const fetchPaymentStatus = createAsyncThunk(
  "payment/status",
  async ({ token, bookingId }, thunkAPI) => {
    try {
      const response = await getPaymentStatusApi(token, bookingId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

// edit payment extra amount action
export const initiateEditExtraRazorpayOrder = createAsyncThunk(
  "payment/initiateEditExtraOrder",
  async ({ token, bookingId }, thunkAPI) => {
    try {
      const response = await createEditExtraPaymentOrderApi(token, bookingId);
      return thunkAPI.fulfillWithValue(response);
    } catch (error) {
      showError(error?.message || "Failed to create extra payment order");
      return thunkAPI.rejectWithValue(error?.message);
    }
  }
);

// edit extra payment verification action
export const verifyEditExtraPayment = createAsyncThunk(
  "payment/verifyEditExtraPayment",
  async ({ token, verifyData }, thunkAPI) => {
    try {
      const response = await verifyEditExtraPaymentApi(token, verifyData);
       showSuccess("Extra Payment Verified Successfully 🎉");
      return thunkAPI.fulfillWithValue(response)
    } catch (error) {
      showError(error?.message || "Extra Payment verification failed")
      return thunkAPI.rejectWithValue(error?.message)
    }
  }
);