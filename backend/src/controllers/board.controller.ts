import { prisma } from "../lib/prisma.js";

export const getAllBoards = async (req, res) => {
  const boards = await prisma.board.findMany({
    where: { userId: req.user.id },
    include: { columns: true },
  });

  res.status(200).json({
    success: true,
    data: boards,
  });
};

export const getBoardById = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.resource,
  });
};

export const createBoard = async (req, res) => {
  const { title } = req.body;

  const board = await prisma.board.create({
    data: { title, userId: req.user.id },
  });

  res.status(201).json({
    success: true,
    data: board,
  });
};

export const deleteBoardById = async (req, res) => {
  await prisma.board.delete({ where: { id: req.resource.id } });

  res.status(200).json({
    success: true,
    data: null,
  });
};

export const updateBoardById = async (req, res) => {
  const { title } = req.body;

  const newBoard = await prisma.board.update({
    where: { id: req.resource.id },
    data: { title },
  });

  res.status(200).json({
    success: true,
    data: newBoard,
  });
};
