import express from "express";
import {
  getUser,
  signout,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";
const router = express.Router();

// Remove these routes (handled by Clerk on frontend):
// router.post("/sign-up", signup);
// router.post("/sign-in", signin);

router.get("/sign-out", isAuthenticated, signout);
router.get("/me", isAuthenticated, getUser);
router.put("/update-profile", isAuthenticated, updateProfile);

export default router;
