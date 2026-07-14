import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { PORT } from "./config/env.js";
import boardRoutes from "./routes/board.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on the port http://localhost:${PORT}`);
});
