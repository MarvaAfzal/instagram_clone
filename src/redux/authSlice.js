import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserService, signupUserService } from "../services/auth/auth.services.js";

// ==== LOGIN USER ====
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const payload = {
        emailOrusername: credentials.emailOrusername, // must match backend
        password: credentials.password,
      };

      const res = await loginUserService(payload);

      // Save users array in localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      if (!users.find(u => u._id === res.user._id)) {
        users.push(res.user);
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Save current user token & info
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      return res.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ==== SIGNUP USER ====
export const signUp = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const res = await signupUserService(data);

      // Save user in users array (for multiple users)
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(res.user);
      localStorage.setItem("users", JSON.stringify(users));

      // Save user info (but do NOT auto login)
      localStorage.setItem("user", JSON.stringify(res.user));

      return res.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// ==== INITIAL STATE ====
const initialState = {
  user: null,
  isLoggedIn: false, // require login
  isSignedUp: false,
  loading: false,
  error: "",
};

// ==== SLICE ====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // SIGNUP
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.isSignedUp = false;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isSignedUp = true;
        state.isLoggedIn = false; // still require login
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSignedUp = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
