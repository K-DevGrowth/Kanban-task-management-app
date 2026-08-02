import { prisma } from "../lib/prisma.js";

export const getAllBoards = async (req, res, next) => {
  const boards = await prisma.board.findMany({
    where: { userId: req.user.id },
    include: { columns: true },
  });

  res.status(200).json({
    success: true,
    data: boards,
  });
};

export const getBoardById = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      board: req.resource,
    });
  } catch (error) {
    next(error);
  }
};

export const createBoard = async (req, res, next) => {
  try {
    const { title } = req.body;

    const board = await prisma.board.create({
      data: { title, userId: req.user.id },
    });

    res.status(201).json({
      success: true,
      data: board,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBoardById = async (req, res, next) => {
  try {
    await prisma.board.delete({ where: { id: req.resource.id } });

    res.status(200).json({
      success: true,
      message: "Delete board successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateBoardById = async (req, res, next) => {
  try {
    const newBoard = await prisma.board.update({
      where: { id: req.resource.id },
      data: { title: req.body.title },
    });

    res.status(200).json({
      success: true,
      message: "Update board successfully",
      data: newBoard,
    });
  } catch (error) {
    next(error);
  }
};
