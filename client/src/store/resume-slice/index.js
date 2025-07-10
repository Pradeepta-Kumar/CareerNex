import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  resumeContent: "",
  isLoading: true,
};

export const create_resume = createAsyncThunk(
  "/resume/create",
  async ({ formData, id }) => {
    console.log({ formData });
    const response = await axios.post(
      `http://localhost:8000/api/resume/create/${id}`, formData
    );
    console.log(response.data.resume);
    return response.data;
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create_resume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_resume.fulfilled, (state, action) => {
        state.resumeContent = action.payload.resume;
        state.isLoading = false;
      })
      .addCase(create_resume.rejected, (state) => {
        state.resumeContent = null;
        state.isLoading = true;
      });
  },
});

export default resumeSlice.reducer;
