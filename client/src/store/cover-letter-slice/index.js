import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  coverLetterContent: "",
  isLoading: true,
};

export const create_cover_letter = createAsyncThunk(
  "/cover-letter/create",
  async ({formData, id}) => {
    console.log({ formData });

    const response = await axios.post(
      `http://localhost:8000/api/cover-letter/create/${id}`,
      formData
    );
    console.log("Cover letter response:", response.data.coverLetter);
    return response.data;
  }
);

const coverLetterSlice = createSlice({
  name: "coverLetter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(create_cover_letter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_cover_letter.fulfilled, (state, action) => {
        state.coverLetterContent = action.payload.coverLetter;
        state.isLoading = false;
      })
      .addCase(create_cover_letter.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default coverLetterSlice.reducer;
