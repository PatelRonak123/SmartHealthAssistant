import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/userModel.js";

// Middleware to verify Clerk JWT and sync user with MongoDB
export const isAuthenticated = ClerkExpressRequireAuth({
  onUserMissing: (req, res) => {
    return res.status(401).json({
      status: false,
      message: "User not authenticated. Please sign in.",
    });
  },
  async afterAuth(req, res, next) {
    try {
      const clerkUserId = req.auth.userId;
      let user = await User.findOne({ clerkUserId });
      if (!user) {
        // Optionally, create user in MongoDB if not present
        user = await User.create({
          clerkUserId,
          fullName: req.auth.sessionClaims?.name || "",
          email: req.auth.sessionClaims?.email || "",
          avatar: {
            public_id: "",
            url: req.auth.sessionClaims?.picture || "",
          },
        });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to authenticate user.",
      });
    }
  },
});
