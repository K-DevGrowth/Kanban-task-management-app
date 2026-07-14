import { Router } from "express";
import { getAll } from "../controllers/board.controller.js";

const boardRoutes = Router();

boardRoutes.get("/", getAll);

export default boardRoutes;
