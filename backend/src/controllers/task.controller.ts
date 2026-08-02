import { prisma } from "../lib/prisma.js";

export const getAllTasks = async (req, res, next) => {
  const tasks = await prisma.task.findMany({
    where: { columnId: req.resource.id },
    include: { subtasks: true },
  });

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskById = async (req, res, next) => {
  const task = await prisma.task.findUnique({
    where: { id: req.resource.id },
    include: { subtasks: true },
  });

  res.status(200).json({
    success: true,
    task,
  });
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

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
  await prisma.task.delete({ where: { id: req.resource.id } });

  res.status(200).json({
    success: true,
    message: "Delete task successfully",
  });
};

export const updateTaskById = async (req, res, next) => {
  const { title, description, order } = req.body;

  const newtask = await prisma.task.update({
    where: { id: req.resource.id },
    data: { title, description, order },
  });

  res.status(200).json({
    success: true,
    message: "Update task successfully",
    data: newtask,
  });
};
