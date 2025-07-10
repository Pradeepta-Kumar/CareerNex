import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  questions: "",
  isLoading: true,
};

export const generate_questions = createAsyncThunk(
  "/generate_questions",
  async ({ formData, id }) => {
    console.log({ formData });

    const response = await axios.post(
      `http://localhost:8000/api/assessments/generate/${id}`, formData
    );
    console.log(response.data.assessments);

    return response.data;
  }
);

const mockInterviewSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generate_questions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generate_questions.fulfilled, (state, action) => {
        state.questions = action.payload.assessments;
        state.isLoading = false;
      })
      .addCase(generate_questions.rejected, (state) => {
        state.questions = null;
        state.isLoading = false;
      });
  },
});

export default mockInterviewSlice.reducer;
