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

const taskRoutes = Router();

const findColumnById = (req) => {
  const columnId =
    req.method === "GET" ? req.query.columnId : req.body.columnId;
  if (!columnId) {
    return null;
  }
  return prisma.column.findUnique({
    where: { id: columnId },
    include: { board: true },
  });
};

const findTaskById = (req) => {
  return prisma.task.findUnique({
    where: { id: req.params.id },
    include: { column: { include: { board: true } } },
  });
};

const requireColumnOwner = requireOwner(
  findColumnById,
  (column) => column.board.userId,
);

const requireTaskOwner = requireOwner(
  findTaskById,
  (task) => task.column.board.userId,
);

taskRoutes.use(authorize);

taskRoutes.get("/", requireColumnOwner, getAllTasks);
taskRoutes.post("/", requireColumnOwner, createTask);

taskRoutes.get("/:id", requireTaskOwner, getTaskById);
taskRoutes.delete("/:id", requireTaskOwner, deleteTaskById);
taskRoutes.patch("/:id", requireTaskOwner, updateTaskById);

export default taskRoutes;
