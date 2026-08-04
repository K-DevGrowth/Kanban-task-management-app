import { prisma } from "../lib/prisma.js";

export const getAllTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { columnId: req.resource.id },
    include: { subtasks: true },
  });

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getTaskById = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.resource,
  });
};

export const createTask = async (req, res) => {
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
};

export const deleteTaskById = async (req, res) => {
  await prisma.task.delete({ where: { id: req.resource.id } });

  res.status(200).json({
    success: true,
    data: null,
  });
};

export const updateTaskById = async (req, res) => {
  const { title, description, order } = req.body;

  const newtask = await prisma.task.update({
    where: { id: req.resource.id },
    data: { title, description, order },
  });

  res.status(200).json({
    success: true,
    data: newtask,
  });
};
