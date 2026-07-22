import { Router } from "express";
import {getMe, signIn, signOut, signUp} from "../controllers/auth.controller.js";
import {authorize} from "../middleware/auth.middleware";

const authRoutes = Router();

authRoutes.post("/sign-up", signUp);
authRoutes.post("/sign-in", signIn);
authRoutes.post("/sign-out", signOut);
authRoutes.get('/me', authorize, getMe)

export default authRoutes;
