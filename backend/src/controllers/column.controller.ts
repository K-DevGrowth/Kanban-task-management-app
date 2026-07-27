import { prisma } from "../lib/prisma.js";

export const getAll = async (req, res, next) => {
  const { boardId } = req.params;

  const columns = await prisma.column.findMany({
    where: { boardId },
    include: { tasks: true },
    orderBy: { order: "asc" },
  });
  
  res.status(200).json({
    success: true,
    data: columns,
  });
};

export const getOne = async (req, res, next) => {
  const column = await prisma.column.findUnique({
    where: { id: req.params.id },
  });

  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  res.status(200).json({
    success: true,
    column,
  });
};

export const create = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "Title is missing" });
    }

    const board = await prisma.board.findUnique({
      where: { id: boardId },
    });

    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }

    const lastColumn = await prisma.column.findFirst({
      where: {
        boardId: board.id,
      },
      orderBy: { order: "desc" },
    });

    const newOrder = lastColumn ? lastColumn.order + 1 : 0;

    const column = await prisma.column.create({
      data: { title, order: newOrder, boardId: board.id },
    });

    res.status(201).json({
      success: true,
      message: "Create column successfully",
      data: column,
    });

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res, next) => {
  const column = await prisma.column.findUnique({
    where: { id: req.params.id },
  });

  if (!column) {
    return res.status(404).json({ error: "column not found" });
  }

  await prisma.column.delete({ where: { id: column.id } });

  res.status(200).json({
    success: true,
    message: "Delete column successfully",
  });
};

export const update = async (req, res, next) => {
  const { boardId, title, order } = req.body;

  const column = await prisma.column.findUnique({
    where: { id: req.params.id },
  });

  if (!column) {
    return res.status(404).json({ error: "column not found" });
  }

  const newcolumn = await prisma.column.update({
    where: { id: column.id },
    data: { boardId, title, order },
  });

  res.status(200).json({
    success: true,
    message: "Update column successfully",
    data: newcolumn,
  });
};
