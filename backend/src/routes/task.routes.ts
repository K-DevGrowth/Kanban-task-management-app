import { Router } from "express";
import {
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  getTaskById,
  createTask,
} from "../controllers/task.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { prisma } from "../lib/prisma.js";
import { requireOwner } from "../middleware/ownership.middleware.js";

const findColumnById = (req) => {
  return prisma.column.findUnique({
    where: { id: req.params.columnId },
    include: { board: true },
  });
};

const findTaskById = (req) => {
  return prisma.task.findUnique({
    where: { id: req.params.id },
    include: { column: { include: { board: true } } },
  });
};

export const taskListRoutes = Router({ mergeParams: true });
taskListRoutes.use(authorize);

const requireColumnOwner = requireOwner(
  findColumnById,
  (column) => column.board.userId,
);

taskListRoutes.get("/", requireColumnOwner, getAllTasks);
taskListRoutes.post("/", requireColumnOwner, createTask);

export const taskItemRoutes = Router();
taskItemRoutes.use(authorize);

const requireTaskOwner = requireOwner(
  findTaskById,
  (task) => task.column.board.userId,
);

taskItemRoutes.get("/:id", requireTaskOwner, getTaskById);
taskItemRoutes.delete("/:id", requireTaskOwner, deleteTaskById);
taskItemRoutes.patch("/:id", requireTaskOwner, updateTaskById);
