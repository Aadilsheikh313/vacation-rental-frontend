
import { createSlice } from "@reduxjs/toolkit";
import { downloadBookingInvoiceRecipet, viewInvoiceRecipet } from "../action/invoiceAction";


const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  invoiceData: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    resetInvoiceStatus: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(downloadBookingInvoiceRecipet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "Downloading invoice...";
      })
      .addCase(downloadBookingInvoiceRecipet.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "Invoice downloaded successfully!";
      })
      .addCase(downloadBookingInvoiceRecipet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Failed to download invoice.";
      })
       // 🔍 View Invoice
      .addCase(viewInvoiceRecipet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Fetching invoice...";
        state.invoiceData = null;
      })
      .addCase(viewInvoiceRecipet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Invoice loaded!";
        state.invoiceData = action.payload.invoice; // 👈 check if your API returns `invoice` field
      })
      .addCase(viewInvoiceRecipet.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch invoice.";
        state.invoiceData = null;
      })
  },
});

export default invoiceSlice.reducer;
export const { resetInvoiceStatus } = invoiceSlice.actions;
