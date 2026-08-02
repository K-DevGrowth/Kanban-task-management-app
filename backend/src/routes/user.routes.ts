import { Router } from "express";
import { getCurrentUser } from "../controllers/user.controller.js";
import { authorize } from "../middleware/auth.middleware.js";

const userRoutes = Router();

userRoutes.get("/", authorize, getCurrentUser);

export default userRoutes;
