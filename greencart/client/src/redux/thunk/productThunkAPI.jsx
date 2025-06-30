import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchAllProducts = createAsyncThunk("shop/fetchProduct", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/product/getAllProducts`);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
})