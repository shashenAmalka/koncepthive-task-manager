import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats,
} from "../controllers/taskController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

// All task routes require authentication
router.use(authenticate);

// IMPORTANT: this specific route must come BEFORE /:id
router.get("/dashboard/stats", getDashboardStats);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;