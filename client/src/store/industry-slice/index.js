import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  insights: null,
  isLoading: false,
  error: null,
};

export const fetchInsights = createAsyncThunk(
  "/fetchInsights",
  async ({id}) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/industry-insights/fetch/${id}`);
      return response.data; 
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    }
  }
);

// ✅ Slice
const insightsSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    resetInsights: (state) => {
      state.insights = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInsights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInsights.fulfilled, (state, action) => {
        state.insights = action.payload.insights;
        state.isLoading = false;
      })
      .addCase(fetchInsights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetInsights } = insightsSlice.actions;
export default insightsSlice.reducer;
