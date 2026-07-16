import { Router } from "express";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../controllers/task.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const taskRoutes = Router();

taskRoutes.get("/", getAll);
taskRoutes.get("/:id", getOne);
taskRoutes.post("/", authorize, create);
taskRoutes.delete("/:id", authorize, remove);
taskRoutes.put("/:id", authorize, update);

export default taskRoutes;
