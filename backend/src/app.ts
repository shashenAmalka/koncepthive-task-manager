import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Koncepthive Task Manager API is running" });
});

import authRoutes from "./routes/authRoutes";
// import taskRoutes from "./routes/taskRoutes";

// API Routes
app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

export default app;