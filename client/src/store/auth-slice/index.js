import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: true,
};

export const sign_up_user = createAsyncThunk(
  "/auth/sign_up_user",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/sign-up",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const sign_in_user = createAsyncThunk(
  "/auth/sign_in_user",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/sign-in",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const sign_in_user_via_google = createAsyncThunk(
  "/auth/sign_in_via_google", 
  async ({ fullname, email, password }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/sign-in/google",
        { fullname, email, password }, 
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      return thunkAPI.rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);


export const signout_user = createAsyncThunk("/auth/signout_user", async () => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/sign-out",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/check_auth", async () => {
  const response = await axios.get(
    "http://localhost:8000/api/auth/check-auth",
    {
      withCredentials: true,
      headers: {
        "Cache-Control":
          "no-store, no-cache,  must-revalidate, proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(sign_up_user.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(sign_up_user.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(sign_up_user.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sign_in_user.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sign_in_user.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(sign_in_user.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signout_user.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;
