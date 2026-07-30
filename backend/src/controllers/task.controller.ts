import { prisma } from "../lib/prisma.js";

export const getAll = async (req, res, next) => {
  const { columnId } = req.query;

  const tasks = await prisma.task.findMany({
    where: { columnId },
  });

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

export const getOne = async (req, res, next) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json({
    success: true,
    task,
  });
};

export const create = async (req, res, next) => {
  try {
    const { columnId, title, description } = req.body;

    const column = await prisma.column.findUnique({
      where: {
        id: columnId,
      },
    });

    if (!column) {
      return res
        .status(404)
        .json({ success: false, message: "Column not found" });
    }

    const lastTask = await prisma.task.findFirst({
      where: { columnId: column.id },
      orderBy: { order: "desc" },
    });

    const newOrder = lastTask ? lastTask.order + 1 : 0;

    const task = await prisma.task.create({
      data: { title, description, order: newOrder, columnId: column?.id },
    });

    res.status(201).json({
      success: true,
      data: task,
    });

    next();
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
};

export const remove = async (req, res, next) => {
  const task = await prisma.task.findUnique({ where: { id: req.params.id } });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  await prisma.task.delete({ where: { id: task.id } });

  res.status(200).json({
    success: true,
    message: "Delete task successfully",
  });
};

export const update = async (req, res, next) => {
  const { title, description, order, columnId } = req.body;

  const task = await prisma.task.findUnique({ where: { id: req.params.id } });

  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }

  const newtask = await prisma.task.update({
    where: { id: task.id },
    data: { title, description, order, columnId },
  });

  res.status(200).json({
    success: true,
    message: "Update task successfully",
    data: newtask,
  });
};
