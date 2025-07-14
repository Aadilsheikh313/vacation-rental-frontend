
import { createSlice } from "@reduxjs/toolkit";
import { initiateRazorpayOrder, verifyPayment } from "../action/paymentAction";

const initialState = {
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initiateRazorpayOrder.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating Razorpay order...";
      })
      .addCase(initiateRazorpayOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
        state.message = "Order created successfully";
      })
      .addCase(initiateRazorpayOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.isLoading = true;
        state.message = "Verifying payment...";
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.paymentResult = action.payload;
        state.message = "Payment verified successfully";
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default paymentSlice.reducer;
export const { resetPaymentStatus } = paymentSlice.actions;
