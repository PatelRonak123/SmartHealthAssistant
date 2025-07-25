import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Message } from "../models/messageModel.js";
import { User } from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import { getReceiverSocketId } from "../utils/socket.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  const filteredUsers = await User.find({ _id: { $ne: user } }).select(
    "-password"
  );
  return res.status(200).json({ 
    status: true,
    users: filteredUsers,
  });
});

export const getMessages = catchAsyncError(async (req, res, next) => {
  const receiverId = req.params.id;
  const myId = req.user._id;
  const receiver = await User.findById(receiverId);
  if (!receiver) {
    return res.status(400).json({
      status: false,
      message: "Receiver ID Invalid",
    });
  }
  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: receiverId },
      { senderId: receiverId, receiverId: myId },
    ],
  }).sort({ createdAt: 1 });

  return res.status(200).json({
    status: true,
    messages,
  });
});

export const sendMessage = catchAsyncError(async (req, res, next) => {
  const { text } = req.body;
  const media = req?.files?.media;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const receiver = await User.findById(receiverId);
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
      try{
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
    }
  catch (err) {
    console.error("Cloudinary upload error", err);
    return res.status(500).json({
      status: false,
      message: "Failed to upload media. Please try again later.",
    });
  }
}

  const newMessage = await Message.create({
    senderId,
    receiverId,
    text: sanitizedText,
    media: mediaUrl,
  });

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  return res.status(201).json(newMessage);
});
