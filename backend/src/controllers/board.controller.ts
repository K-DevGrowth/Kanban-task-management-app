import { prisma } from "../lib/prisma.js";

export const getAll = async (req, res, next) => {
  const boards = await prisma.board.findMany({ include: { columns: true } });
  res.status(200).json({
    success: true,
    data: boards,
  });
};

export const getOne = async (req, res, next) => {
  const board = await prisma.board.findUnique({ where: { id: req.params.id } });

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  res.status(200).json({
    success: true,
    data: board,
  });
};

export const create = async (req, res, next) => {
  try {
    const { title } = req.body;

    const board = await prisma.board.create({
      data: { title, userId: req.user.id },
    });

    res.status(201).json({
      success: true,
      data: board,
    });

    next();
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
};

export const remove = async (req, res, next) => {
  const board = await prisma.board.findUnique({ where: { id: req.params.id } });

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  await prisma.board.delete({ where: { id: board.id } });

  res.status(200).json({
    success: true,
    message: "Delete board successfully",
  });
};

export const update = async (req, res, next) => {
  const board = await prisma.board.findUnique({ where: { id: req.params.id } });

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  const newBoard = await prisma.board.update({
    where: { id: board.id },
    data: { title: req.body.title },
  });

  res.status(200).json({
    success: true,
    message: "Update board successfully",
    data: newBoard,
  });
};
