import { Router } from "express";
import {
  getAllBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById,
} from "../controllers/board.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const boardRoutes = Router();

boardRoutes.use(authorize);

boardRoutes.get("/", getAllBoards);
boardRoutes.post("/", createBoard);
boardRoutes.get("/:id", getBoardById);
boardRoutes.delete("/:id", deleteBoardById);
boardRoutes.patch("/:id", updateBoardById);

export default boardRoutes;
