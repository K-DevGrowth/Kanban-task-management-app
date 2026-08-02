import { Router } from "express";
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById,
} from "../controllers/board.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { prisma } from "../lib/prisma.js";
import { requireOwner } from "../middleware/ownership.middleware.js";

const boardRoutes = Router();

const findBoardById = (req) => {
  return prisma.board.findUnique({
    where: { id: req.params.id },
  });
};

boardRoutes.use(authorize);

boardRoutes.get("/", getAllBoards);
boardRoutes.post("/", createBoard);
boardRoutes.get(
  "/:id",
  requireOwner(findBoardById, (board) => board.userId),
  getBoardById,
);
boardRoutes.delete(
  "/:id",
  requireOwner(findBoardById, (board) => board.userId),
  deleteBoardById,
);
boardRoutes.patch(
  "/:id",
  requireOwner(findBoardById, (board) => board.userId),
  updateBoardById,
);

export default boardRoutes;
