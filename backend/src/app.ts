import express from "express";
import { PORT } from "./config/env.js";
import authRoutes from "./routes/auth.routes.js";
import boardRoutes from "./routes/board.routes.js";
import userRoutes from "./routes/user.routes.js";
import { columnItemRoutes, columnListRoutes } from "./routes/column.routes.js";
import { taskItemRoutes, taskListRoutes } from "./routes/task.routes.js";
import {
  subtaskItemRoutes,
  subtaskListRoutes,
} from "./routes/subtask.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);

app.use("/api/boards/:boardId/columns", columnListRoutes);
app.use("/api/columns", columnItemRoutes);

app.use("/api/columns/:columnId/tasks", taskListRoutes);
app.use("/api/tasks", taskItemRoutes);

app.use("/api/tasks/:taskId/subtasks", subtaskListRoutes);
app.use("/api/subtasks", subtaskItemRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on the port http://localhost:${PORT}`);
});
