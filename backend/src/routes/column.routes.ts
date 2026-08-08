import { Router } from "express";
import {
  createColumn,
  getColumnById,
  getAllColumns,
  deleteColumnById,
  updateColumnById,
} from "../controllers/column.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { prisma } from "../lib/prisma.js";
import { requireOwner } from "../middleware/ownership.middleware.js";

const findBoardById = (req) => {
  return prisma.board.findUnique({
    where: { id: req.params.boardId },
  });
};

const findColumnById = (req) => {
  return prisma.column.findUnique({
    where: { id: req.params.id },
    include: { board: true },
  });
};

export const columnListRoutes = Router({ mergeParams: true });
columnListRoutes.use(authorize);

const requireBoardOwner = requireOwner(findBoardById, (board) => board.userId);

columnListRoutes.get("/", requireBoardOwner, getAllColumns);
columnListRoutes.post("/", requireBoardOwner, createColumn);

export const columnItemRoutes = Router();
columnItemRoutes.use(authorize);

const requireColumnOwner = requireOwner(
  findColumnById,
  (column) => column.board.userId,
);

columnItemRoutes.get("/:id", requireColumnOwner, getColumnById);
columnItemRoutes.delete("/:id", requireColumnOwner, deleteColumnById);
columnItemRoutes.patch("/:id", requireColumnOwner, updateColumnById);
