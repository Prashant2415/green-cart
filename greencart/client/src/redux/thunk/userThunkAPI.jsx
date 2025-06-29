import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// You can optionally move this base URL to an env file or config
const API_URL = "http://localhost:3000/api/auth/signIn";

export const userSignIn = createAsyncThunk(
  'user/signIn',
  async (input, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, input);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Sign in failed. Please try again."
      );
    }
  }
);
