import { Router } from "express";
import {
  createSubtask,
  deleteSubtaskById,
  getAllSubtasks,
  getSubtaskById,
  updateSubtaskById,
} from "../controllers/subtask.controller";
import { authorize } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";
import { requireOwner } from "../middleware/ownership.middleware";

const findTaskById = (req) => {
  return prisma.task.findUnique({
    where: { id: req.params.taskId },
    include: { column: { include: { board: true } } },
  });
};

const findSubtaskById = (req) => {
  return prisma.subtask.findUnique({
    where: { id: req.params.id },
    include: { task: { include: { column: { include: { board: true } } } } },
  });
};

export const subtaskListRoutes = Router({ mergeParams: true });
subtaskListRoutes.use(authorize);
subtaskListRoutes.use(
  requireOwner(findTaskById, (task) => task.column.board.userId),
);
subtaskListRoutes.get("/", getAllSubtasks);
subtaskListRoutes.post("/", createSubtask);

export const subtaskItemRoutes = Router();
subtaskItemRoutes.use(authorize);
subtaskItemRoutes.use(
  requireOwner(findSubtaskById, (subtask) => subtask.task.column.board.userId),
);
subtaskItemRoutes.get("/:id", getSubtaskById);
subtaskItemRoutes.delete("/:id", deleteSubtaskById);
subtaskItemRoutes.patch("/:id", updateSubtaskById);
