import { prisma } from "../lib/prisma";

export const getAllSubtasks = async (req, res, next) => {
  try {
    const subtasks = await prisma.subtask.findMany({
      where: { taskId: req.resource.id },
      orderBy: { order: "asc" },
    });

    res.json({
      success: true,
      message: "Subtasks retrieved successfully",
      data: subtasks,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubtask = async (req, res, next) => {
  try {
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
      message: "Subtask created successfully",
      data: newSubtask,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubtaskById = async (req, res, next) => {
  const subtask = await prisma.subtask.findUnique({
    where: { id: req.resource.id },
  });

  res.status(200).json({
    success: true,
    data: subtask,
  });
};

export const deleteSubtaskById = async (req, res, next) => {
  await prisma.subtask.delete({ where: { id: req.resource.id } });

  res.status(200).json({
    success: true,
    message: "Subtask deleted successfully",
  });
};

export const updateSubtaskById = async (req, res, next) => {
  const { title, isDone } = req.body;

  const updatedSubtask = await prisma.subtask.update({
    where: { id: req.resource.id },
    data: { title, isDone },
  });

  res.status(200).json({
    success: true,
    message: "Subtask updated successfully",
    data: updatedSubtask,
  });
};
