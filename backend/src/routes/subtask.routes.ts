import { Router } from "express";
import {
  createSubtask,
  deleteSubtaskById,
  getAllSubtasks,
  getSubtaskById,
  updateSubtaskById,
} from "../controllers/subtask.controller";
import { authorize } from "../middleware/auth.middleware";

export const subtaskListRoutes = Router({ mergeParams: true });
subtaskListRoutes.get("/", getAllSubtasks);
subtaskListRoutes.post("/", authorize, createSubtask);

export const subtaskItemRoutes = Router();
subtaskItemRoutes.get("/:id", authorize, getSubtaskById);
subtaskItemRoutes.delete("/:id", authorize, deleteSubtaskById);
subtaskItemRoutes.patch("/:id", authorize, updateSubtaskById);
