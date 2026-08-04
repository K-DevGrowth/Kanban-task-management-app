import { prisma } from "../lib/prisma.js";

export const getAllColumns = async (req, res) => {
  const columns = await prisma.column.findMany({
    where: { boardId: req.resource.id },
    include: { tasks: true },
    orderBy: { order: "asc" },
  });

  res.status(200).json({
    success: true,
    data: columns,
  });
};

export const getColumnById = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.resource,
  });
};

export const createColumn = async (req, res) => {
  const { title } = req.body;

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
};

export const deleteColumnById = async (req, res) => {
  await prisma.column.delete({ where: { id: req.resource.id } });
  res.status(200).json({ success: true, data: null });
};

export const updateColumnById = async (req, res) => {
  const { title, order } = req.body;

  const newcolumn = await prisma.column.update({
    where: { id: req.resource.id },
    data: { title, order },
  });

  res.status(200).json({
    success: true,
    data: newcolumn,
  });
};
