// redux/reducers/paymentReducer.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getRazorpayKey,
  initiateRazorpayOrder,
  verifyPayment,
} from "../action/paymentAction";

const initialState = {
  key: null,
  order: null,
  paymentResult: null,

  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentStatus: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.order = null;
      state.paymentResult = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /**
       * 🔹 Create Razorpay Order
       */
      .addCase(initiateRazorpayOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating Razorpay order...";
      })
      .addCase(initiateRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload.order; // backend returns {success, order}
        state.message = "Order created successfully";
      })
      .addCase(initiateRazorpayOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /**
       * 🔹 Get Razorpay Public Key
       */
      .addCase(getRazorpayKey.pending, (state) => {
        state.isLoading = true;
        state.message = "Fetching Razorpay key...";
      })
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.key = action.payload.key; // backend returns {key}
        state.message = "Razorpay key fetched";
      })
      .addCase(getRazorpayKey.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      /**
       * 🔹 Verify Payment
       */
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
        state.message = "Verifying payment...";
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentResult = action.payload; // backend returns booking + payment
        state.message = "Payment verified successfully";
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
