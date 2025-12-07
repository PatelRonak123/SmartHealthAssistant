import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { gernerateJWtToken } from "../utils/jwtToken.js";
import { v2 as cloudinary } from "cloudinary";

export const signup = catchAsyncError(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide complete details",
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      message: "Invalid Email Format",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: false,
      message: "Password must be at least 8 character long",
    });
  }

  const isEmailAlreadyUsed = await User.findOne({ email });
  if (isEmailAlreadyUsed) {
    return res.status(400).json({
      status: false,
      message: "Email is already registered.",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    fullName,
    email,
    password: hashPassword,
    avatar: {
      public_id: "",
      url: "",
    },
  });

  gernerateJWtToken(user, "User registered successfully", 201, res);
});

export const signin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide email and password",
    });
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: false,
      message: "Invalid Email Format",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials",
    });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(400).json({
      status: false,
      message: "Invalid Credentials",
    });
  }

  gernerateJWtToken(user, "User login successfully", 201, res);
});

export const signout = catchAsyncError(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      maxAge: 0,
      sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
      secure: process.env.NODE_ENV !== "development" ? true : false,
    })
    .json({
      status: true,
      message: "User logged out successfully",
    });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
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

  let user = await User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    status: true,
    message: "Profile updated Successfully",
    user,
  });
});
