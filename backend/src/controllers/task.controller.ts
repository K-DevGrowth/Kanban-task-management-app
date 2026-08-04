import { prisma } from "../lib/prisma.js";

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { columnId: req.resource.id },
      include: { subtasks: true },
    });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.resource,
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

    const lastTask = await prisma.task.findFirst({
      where: { columnId: req.resource.id },
      orderBy: { order: "desc" },
    });

    const newOrder = lastTask ? lastTask.order + 1 : 0;

    const task = await prisma.task.create({
      data: { title, description, order: newOrder, columnId: req.resource.id },
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTaskById = async (req, res, next) => {
  try {
    await prisma.task.delete({ where: { id: req.resource.id } });

    res.status(200).json({
      success: true,
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTaskById = async (req, res, next) => {
  try {
    const { title, description, order } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

    const newtask = await prisma.task.update({
      where: { id: req.resource.id },
      data: { title, description, order },
    });

    res.status(200).json({
      success: true,
      data: newtask,
    });
  } catch (error) {
    next(error);
  }
};
