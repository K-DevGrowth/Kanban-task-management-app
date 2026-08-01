import { Router } from "express";
import {
  createColumn,
  getColumnById,
  getAllColumns,
  deleteColumnById,
  updateColumnById,
} from "../controllers/column.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

export const columnListRoutes = Router({ mergeParams: true });
columnListRoutes.use(authorize);
columnListRoutes.get("/", getAllColumns);
columnListRoutes.post("/", createColumn);

export const columnItemRoutes = Router();
columnItemRoutes.use(authorize);
columnItemRoutes.get("/:id", getColumnById);
columnItemRoutes.delete("/:id", deleteColumnById);
columnItemRoutes.patch("/:id", updateColumnById);
