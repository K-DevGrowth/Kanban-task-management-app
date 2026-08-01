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
subtaskListRoutes.use(authorize);
subtaskListRoutes.get("/", getAllSubtasks);
subtaskListRoutes.post("/", createSubtask);

export const subtaskItemRoutes = Router();
subtaskItemRoutes.use(authorize);
subtaskItemRoutes.get("/:id", getSubtaskById);
subtaskItemRoutes.delete("/:id", deleteSubtaskById);
subtaskItemRoutes.patch("/:id", updateSubtaskById);
