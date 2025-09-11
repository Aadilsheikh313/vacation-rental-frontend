import { createSlice } from "@reduxjs/toolkit";
import { PricesBaseFilterPost } from "../action/filterAction";

const initialState = {
    filter: [],
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        reset: () => initialState,

        filterPrice: (state) => {
            state.filter = [];
        },

        filterresetStatus: (state) => {
            state.message = "";
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(PricesBaseFilterPost.pending, (state) =>{
            state.isLoading = true;
            state.message = "Fetching all the price Filter posts ..."; 
        })
        .addCase(PricesBaseFilterPost.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.filter = action.payload.properties || [];
        })
        .addCase(PricesBaseFilterPost.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload?.message || action.payload || "Failed to fetch price filter properties";
        })  
    }
})

export default filterSlice.reducer;
export const { reset, filterPrice, filterresetStatus } = filterSlice.actions;
