import express from "express";
import { isAuthenticated } from "../middlewares/authMiddelware.js";
import {
  getAllUsers,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";
const router = express.Router();

router.get("/users", isAuthenticated, getAllUsers);
router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessage);

export default router;
