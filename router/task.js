import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/task-controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, createTask);
router.get("/allTask", isAuthenticated, getTask);

// ? For updating task we used put request ;

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
