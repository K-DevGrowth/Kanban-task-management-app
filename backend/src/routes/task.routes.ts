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

taskRoutes.use(authorize);

taskRoutes.get("/", getAll);
taskRoutes.post("/", create);
taskRoutes.get("/:id", getOne);
taskRoutes.delete("/:id", remove);
taskRoutes.patch("/:id", update);

export default taskRoutes;
