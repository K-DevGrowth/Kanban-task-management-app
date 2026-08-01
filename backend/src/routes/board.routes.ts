import { Router } from "express";
import {
  getAllBoards,
  updateBoard,
  removeBoard,
  createBoard,
  getOneBoard,
} from "../controllers/board.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const boardRoutes = Router();

boardRoutes.use(authorize);

boardRoutes.get("/", getAllBoards);
boardRoutes.get("/:id", getOneBoard);
boardRoutes.post("/", createBoard);
boardRoutes.delete("/:id", removeBoard);
boardRoutes.patch("/:id", updateBoard);

export default boardRoutes;
