import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { getReceiverSocketId } from "../utils/socket.js";
import { io } from "../utils/socket.js";

// Get all users except the current user
export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const clerkUserId = req.user.clerkUserId;
  const filteredUsers = await User.find({ clerkUserId: { $ne: clerkUserId } });
  return res.status(200).json({
    status: true,
    users: filteredUsers,
  });
});

// Get messages between current user and another user (by Clerk user ID)
export const getMessages = catchAsyncError(async (req, res, next) => {
  const receiverClerkUserId = req.params.id;
  const myClerkUserId = req.user.clerkUserId;

  const receiver = await User.findOne({ clerkUserId: receiverClerkUserId });
  if (!receiver) {
    return res.status(400).json({
      status: false,
      message: "Receiver ID is Invalid",
    });
  }

  const messages = await Message.find({
    $or: [
      { senderId: myClerkUserId, receiverId: receiverClerkUserId },
      { senderId: receiverClerkUserId, receiverId: myClerkUserId },
    ],
  }).sort({ createdAt: 1 });

  return res.status(200).json({
    status: true,
    messages,
  });
});

// Send a message from current user to another user (by Clerk user ID)
export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;
  const media = req?.files?.media;
  const { id: receiverClerkUserId } = req.params;
  const senderClerkUserId = req.user.clerkUserId;

  const receiver = await User.findOne({ clerkUserId: receiverClerkUserId });
  if (!receiver) {
    return res.status(400).json({
      status: false,
      message: "Receiver ID Invalid",
    });
  }

  const sanitizedText = text?.trim() || "";
  if (!sanitizedText && !media) {
    return res.status(400).json({
      status: false,
      message: "Cannot send empty message",
    });
  }

  let mediaUrl = "";

  if (media) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(
        media.tempFilePath,
        {
          resource_type: "auto",
          folder: "SMART_HEALTH_ASSISTANT_MEDIA",
          transformation: [
            { width: 1080, height: 1080, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        }
      );
      mediaUrl = uploadResponse?.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error", err);
      return res.status(500).json({
        status: false,
        message: "Failed to upload media. Please try again later.",
      });
    }
  }

  const newMessage = await Message.create({
    senderId: senderClerkUserId,
    receiverId: receiverClerkUserId,
    text: sanitizedText,
    media: mediaUrl,
  });

  const receiverSocketId = getReceiverSocketId(receiverClerkUserId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  return res.status(201).json(newMessage);
});
