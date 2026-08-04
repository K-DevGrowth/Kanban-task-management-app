import { prisma } from "../lib/prisma.js";

export const getAllColumns = async (req, res, next) => {
  try {
    const columns = await prisma.column.findMany({
      where: { boardId: req.resource.id },
      include: { tasks: true },
      orderBy: { order: "asc" },
    });

    res.status(200).json({
      success: true,
      data: columns,
    });
  } catch (error) {
    next(error);
  }
};

export const getColumnById = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.resource,
    });
  } catch (error) {
    next(error);
  }
};

export const createColumn = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

    const lastColumn = await prisma.column.findFirst({
      where: {
        boardId: req.resource.id,
      },
      orderBy: { order: "desc" },
    });

    const newOrder = lastColumn ? lastColumn.order + 1 : 0;

    const column = await prisma.column.create({
      data: { title, order: newOrder, boardId: req.resource.id },
    });

    res.status(201).json({
      success: true,
      data: column,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteColumnById = async (req, res, next) => {
  try {
    await prisma.column.delete({ where: { id: req.resource.id } });
    res.status(200).json({ success: true, data: null });
  } catch (error) {
    next(error);
  }
};

export const updateColumnById = async (req, res, next) => {
  try {
    const { title, order } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

    const newcolumn = await prisma.column.update({
      where: { id: req.resource.id },
      data: { title, order },
    });

    res.status(200).json({
      success: true,
      data: newcolumn,
    });
  } catch (error) {
    next(error);
  }
};
