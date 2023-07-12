import express from "express";
const router = express.Router();

import {
  getToDo
} from "../controller/userController.js";

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/userController.js";

import {protect} from "../middleware/authMiddleware.js";

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/home").get(protect, getToDo);

export default router;
