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
columnListRoutes.use(authorize);
columnListRoutes.get("/", getAll);
columnListRoutes.post("/", create);

export const columnItemRoutes = Router();
columnItemRoutes.use(authorize);
columnItemRoutes.get("/:id", getOne);
columnItemRoutes.delete("/:id", remove);
columnItemRoutes.patch("/:id", update);
