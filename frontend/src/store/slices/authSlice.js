import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("user/me", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/user/me");
    connectSocket(res.data.user);
    return res.data.user;
  } catch (err) {
    console.log("Error fetching user", err);
    return thunkAPI.rejectWithValue(
      err.response?.data || "Failed to fetch user"
    );
  }
});

export const logout = createAsyncThunk("user/sign-out", async (_, thunkAPI) => {
  try {
    await axiosInstance.get("/user/sign-out");
    disconnectSocket();
    return null;
  } catch (err) {
    toast.error(err.message.data.message);
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const login = createAsyncThunk(
  "user/sign-in",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/user/sign-in", data);
      connectSocket(res.data);
      toast.success("Logged in successully!");
      return res.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const signup = createAsyncThunk(
  "user/sign-up",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/user/sign-up", data);
      connectSocket(res.data);
      toast.success("Account created successfully!");
      return res.data;
    } catch (err) {
      toast.error(err.response.data.message);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/update-profile",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.put("/user/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },

  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(logout.rejected, (state) => {
        state.authUser = state.authUser;
      })
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isLoggingIn = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isSigningUp = false;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload; // update Redux user
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfile.rejected,(state)=>{
        state.isUpdatingProfile = false;
      })
  },
});

export const { setOnlineUsers } = authSlice.actions;
export default authSlice.reducer;
