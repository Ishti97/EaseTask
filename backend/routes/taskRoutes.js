import express from "express";
const router = express.Router();

import {
  saveToDo, updateToDo, deleteToDo
} from "../controller/TaskController.js";

import {protect} from "../middleware/authMiddleware.js";

router.route("/create").post(protect, saveToDo);
router.route("/update").put(protect, updateToDo);
router.route("/delete").post(protect, deleteToDo);

export default router;
