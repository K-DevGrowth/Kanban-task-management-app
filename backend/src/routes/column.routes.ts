import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/column.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

export const columnListRoutes = Router({ mergeParams: true });
columnListRoutes.get("/", getAll);
columnListRoutes.post("/", authorize, create);

export const columnItemRoutes = Router();
columnItemRoutes.get("/:id", getOne);
columnItemRoutes.delete("/:id", authorize, remove);
columnItemRoutes.put("/:id", authorize, update);
