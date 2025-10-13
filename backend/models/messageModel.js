import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String, // Clerk user ID
      required: true,
    },
    receiverId: {
      type: String, // Clerk user ID
      required: true,
    },
    text: {
      type: String,
    },
    media: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
