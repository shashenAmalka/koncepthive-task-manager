import { Response } from "express";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/authMiddleware";
import { validateTaskInput } from "../utils/validators";

// GET /api/tasks?search=&status=&priority=&sortBy=
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { search, status, priority, sortBy } = req.query;

    const where: any = {
      userId: req.user!.userId,
    };

    if (search) {
      where.title = { contains: String(search), mode: "insensitive" };
    }

    if (status) {
      where.status = String(status);
    }

    if (priority) {
      where.priority = String(priority);
    }

    let orderBy: any = { createdAt: "desc" }; // default: newest first

    if (sortBy === "oldest") {
      orderBy = { createdAt: "asc" };
    } else if (sortBy === "dueDate") {
      orderBy = { dueDate: "asc" };
    }

    const tasks = await prisma.task.findMany({ where, orderBy });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const task = await prisma.task.findFirst({
      where: { id, userId: req.user!.userId },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /api/tasks
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const errors = validateTaskInput({ title, priority, status, dueDate });
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        priority,
        status,
        dueDate: new Date(dueDate),
        userId: req.user!.userId,
      },
    });

    return res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("Create task error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, description, priority, status, dueDate } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.user!.userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const errors = validateTaskInput({ title, priority, status, dueDate }, true);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation failed", errors });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status }),
        ...(dueDate !== undefined && { dueDate: new Date(dueDate) }),
      },
    });

    return res.status(200).json({ message: "Task updated", task: updatedTask });
  } catch (error) {
    console.error("Update task error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    const existingTask = await prisma.task.findFirst({
      where: { id, userId: req.user!.userId },
    });

    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    await prisma.task.delete({ where: { id } });

    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error("Delete task error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/tasks/dashboard/stats
export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const now = new Date();

    const [total, pending, inProgress, completed, overdue] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: "PENDING" } }),
      prisma.task.count({ where: { userId, status: "IN_PROGRESS" } }),
      prisma.task.count({ where: { userId, status: "COMPLETED" } }),
      prisma.task.count({
        where: {
          userId,
          status: { not: "COMPLETED" },
          dueDate: { lt: now },
        },
      }),
    ]);

    return res.status(200).json({
      total,
      pending,
      inProgress,
      completed,
      overdue,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};