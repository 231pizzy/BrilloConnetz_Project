import express from "express";
import {
  getUserListings,
  signOut,
  signin,
  signup,
  updateUser,
  verifyEmail,

} from "../controllers/auth.controllers.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/signin", signin);
router.get("/signout", signOut);
router.post("/update/:id", verifyToken, updateUser);
router.get("/listings/:id", verifyToken, getUserListings);

export default router;
