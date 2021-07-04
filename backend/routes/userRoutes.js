import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);
//middlewareを実装するにはこんな感じで最初に引数として配置 protect

export default router;
