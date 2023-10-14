import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCreateUser = createAsyncThunk(
  "/user/fetchCreateUser",
  async (params) => {
    const { data } = await axios.post("/user/create", params);

    return data;
  }
);

export const fetchLoginUser = createAsyncThunk(
  "/user/fetchLoginUser",
  async (params) => {
    const { data } = await axios.post("/user/login", params);

    return data;
  }
);

export const fetchGetUser = createAsyncThunk("/user/fetchGetUser", async () => {
  const { data } = await axios.get("/user/get");

  return data;
});

const initialState = {
  data: null,
  status: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },

  extraReducers: {
    // Create
    [fetchCreateUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchCreateUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchCreateUser.rejected]: (state) => {
      state.status = "loaded";
      state.data = null;
    },

    // Login
    [fetchLoginUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchLoginUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchLoginUser.rejected]: (state) => {
      state.status = "loaded";
      state.data = null;
    },

    // Get user
    [fetchGetUser.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },

    [fetchGetUser.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    },

    [fetchGetUser.rejected]: (state) => {
      state.status = "loaded";
      state.data = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const selectUser = (state) => state.auth;
export const { logout } = userSlice.actions;
