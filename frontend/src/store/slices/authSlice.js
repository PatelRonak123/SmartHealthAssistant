import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { connectSocket, disconnectSocket } from "../../lib/socket";
import { toast } from "react-toastify";

// Fetch user from your backend (which syncs with Clerk)
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

// Clerk handles logout, but you may want to clear backend session/socket
export const logout = createAsyncThunk("user/sign-out", async (_, thunkAPI) => {
  try {
    await axiosInstance.get("/user/sign-out");
    disconnectSocket();
    return null;
  } catch (err) {
    toast.error(err.response?.data?.message || "Logout failed");
    return thunkAPI.rejectWithValue(err.response?.data?.message);
  }
});

// Profile update (user must be authenticated with Clerk)
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
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
  },

  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setAuthUser(state, action) {
      state.authUser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isCheckingAuth = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.authUser = null;
        state.isCheckingAuth = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.authUser = action.payload;
        state.isUpdatingProfile = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      });
  },
});

export const { setOnlineUsers, setAuthUser } = authSlice.actions;
export default authSlice.reducer;