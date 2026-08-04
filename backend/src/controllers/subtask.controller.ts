import { prisma } from "../lib/prisma";

export const getAllSubtasks = async (req, res) => {
  const subtasks = await prisma.subtask.findMany({
    where: { taskId: req.resource.id },
    orderBy: { order: "asc" },
  });

  res.json({
    success: true,
    data: subtasks,
  });
};

export const createSubtask = async (req, res) => {
  const { title, isDone } = req.body;

  const lastSubtask = await prisma.subtask.findFirst({
    where: { taskId: req.resource.id },
    orderBy: { order: "desc" },
  });

  const newOrder = lastSubtask ? lastSubtask.order + 1 : 0;

  const newSubtask = await prisma.subtask.create({
    data: {
      title,
      isDone,
      task: {
        connect: { id: req.resource.id },
      },
      order: newOrder,
    },
  });

  res.status(201).json({
    success: true,
    data: newSubtask,
  });
};

export const getSubtaskById = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.resource,
  });
};

export const deleteSubtaskById = async (req, res) => {
  await prisma.subtask.delete({ where: { id: req.resource.id } });

  res.status(200).json({
    success: true,
    data: null,
  });
};

export const updateSubtaskById = async (req, res) => {
  const { title, isDone } = req.body;

  const updatedSubtask = await prisma.subtask.update({
    where: { id: req.resource.id },
    data: { title, isDone },
  });

  res.status(200).json({
    success: true,
    data: updatedSubtask,
  });
};
