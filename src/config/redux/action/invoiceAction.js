import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadInvoiceApi, viewInvoiceApi } from "../../../api/invoiceApi";


export const downloadBookingInvoiceRecipet = createAsyncThunk(
    "invoice/downloadBookingInvoiceRecipet",
    async({ bookingId, token }, thunkAPI) =>{
        try {
            const response = await getDownloadInvoiceApi(bookingId,token);
                  return thunkAPI.fulfillWithValue(response);
        } catch (error) {
           console.error("❌ Download invoice error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to download invoice property"
      ); 
        }
    }
)

export const viewInvoiceRecipet = createAsyncThunk(
  "invoice/viewInvoiceRecipet",
  async({bookingId, token}, thunkAPI) =>{
    try {
      const response = await viewInvoiceApi(bookingId,token);
                  return thunkAPI.fulfillWithValue(response);
    } catch (error) {
       console.error("❌ view invoice error:", error);
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to vie invoice property"
      ); 
    }
  }
)