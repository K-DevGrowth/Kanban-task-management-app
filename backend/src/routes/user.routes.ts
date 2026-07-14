import { Router } from "express";
import { getAll } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", getAll);

export default userRoutes;
