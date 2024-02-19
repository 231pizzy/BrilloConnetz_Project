import express from "express";
import {
  forgotPassword,
  resendOtp,
  resetPassword,
  signOut,
  signin,
  signup,
  updateUser,
  verifyEmail,
  verifyOTP,

} from "../controllers/auth.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp/:userId", resendOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post("/update/:id", verifyToken, updateUser);

export default router;
