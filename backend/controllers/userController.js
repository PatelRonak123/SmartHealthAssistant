import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";

// REMOVE: signup and signin (handled by Clerk on frontend)

export const signout = catchAsyncError(async (req, res, next) => {
  // Clerk handles signout on the frontend.
  // Optionally, clear any backend session or socket here.
  return res.status(200).json({
    status: true,
    message: "User logged out successfully",
  });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  // Use Clerk user ID to find user in MongoDB
  const user = await User.findOne({ clerkUserId: req.user.clerkUserId });
  if (!user) {
    return res.status(400).json({
      status: false,
      message: "User not found",
    });
  }
  return res.status(200).json({
    status: true,
    user,
  });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { email, fullName } = req.body;
  if (fullName?.trim().length === 0 || email?.trim().length === 0) {
    return res.status(400).json({
      status: false,
      message: "Fullname and email can't be empty.",
    });
  }

  const avatar = req?.files?.avatar;
  let cloudinaryResponse = {};
  if (avatar) {
    try {
      const oldAvatarPublicId = req.user?.avatar?.public_id;
      if (oldAvatarPublicId && oldAvatarPublicId.length > 0) {
        await cloudinary.uploader.destroy(oldAvatarPublicId);
      }
      cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath,
        {
          folder: "SMART_HEALTH_ASSISTANT_USER",
          transformation: [
            { width: 300, height: 300, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );
    } catch (error) {
      console.error("Cloudinary upload error", error);
      return res.status(500).json({
        status: false,
        message: "Failed to upload avatar. Please try again later.",
      });
    }
  }

  let data = {
    fullName,
    email,
  };

  if (
    avatar &&
    cloudinaryResponse?.public_id &&
    cloudinaryResponse?.secure_url
  ) {
    data.avatar = {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    };
  }

  // Update user by Clerk user ID
  let user = await User.findOneAndUpdate(
    { clerkUserId: req.user.clerkUserId },
    data,
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: true,
    message: "Profile updated Successfully",
    user,
  });
});import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

export const useClerkAxios = () => {
  const { getToken } = useAuth();

  const clerkAxios = axios.create({
    baseURL:
      import.meta.env.MODE === "development"
        ? "http://localhost:4000/api/v1"
        : "/",
    withCredentials: true,
  });

  clerkAxios.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  return clerkAxios;
};