import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/column.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const columnRoutes = Router();

columnRoutes.get("/", getAll);
columnRoutes.get("/:id", getOne);
columnRoutes.post("/", authorize, create);
columnRoutes.delete("/:id", authorize, remove);
columnRoutes.put("/:id", authorize, update);

export default columnRoutes;
