import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/board.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const boardRoutes = Router();

boardRoutes.get("/", getAll);
boardRoutes.get("/:id", getOne);
boardRoutes.post("/", authorize, create);
boardRoutes.delete("/:id", authorize, remove);
boardRoutes.patch("/:id", authorize, update);

export default boardRoutes;
