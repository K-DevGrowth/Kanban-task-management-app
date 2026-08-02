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
      column: req.resource,
    });
  } catch (error) {
    next(error);
  }
};

export const createColumn = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is missing" });
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
      message: "Create column successfully",
      data: column,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteColumnById = async (req, res, next) => {
  try {
    await prisma.column.delete({ where: { id: req.resource.id } });
    res
      .status(200)
      .json({ success: true, message: "Delete column successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateColumnById = async (req, res, next) => {
  try {
    const { title, order } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is missing" });
    }

    const newcolumn = await prisma.column.update({
      where: { id: req.resource.id },
      data: { title, order },
    });

    res.status(200).json({
      success: true,
      message: "Update column successfully",
      data: newcolumn,
    });
  } catch (error) {
    next(error);
  }
};
