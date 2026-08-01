import { Router } from "express";
import {
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  getTaskById,
  createTask,
} from "../controllers/task.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const taskRoutes = Router();

taskRoutes.use(authorize);

taskRoutes.get("/", getAllTasks);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getTaskById);
taskRoutes.delete("/:id", deleteTaskById);
taskRoutes.patch("/:id", updateTaskById);

export default taskRoutes;
