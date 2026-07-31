import { prisma } from "../lib/prisma";

export const getAllSubtasks = async (req, res, next) => {
  try {
    const subtasks = await prisma.subtask.findMany({
      where: { taskId: req.params.taskId },
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
    const { taskId } = req.params;

    const lastSubtask = await prisma.subtask.findFirst({
      where: { taskId },
      orderBy: { order: "desc" },
    });

    const newOrder = lastSubtask ? lastSubtask.order + 1 : 0;

    const newSubtask = await prisma.subtask.create({
      data: {
        title,
        isDone,
        task: {
          connect: { id: taskId },
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

export const getSubtaskById = async (req, res, next) => {};

export const deleteSubtaskById = async (req, res, next) => {};

export const updateSubtaskById = async (req, res, next) => {};
