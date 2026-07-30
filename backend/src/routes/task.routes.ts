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
taskRoutes.post("/", authorize, create);
taskRoutes.get("/:id", getOne);
taskRoutes.delete("/:id", authorize, remove);
taskRoutes.patch("/:id", authorize, update);

export default taskRoutes;
