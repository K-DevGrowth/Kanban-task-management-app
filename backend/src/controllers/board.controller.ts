import { prisma } from "../lib/prisma.js";

export const getAllBoards = async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({
      where: { userId: req.user.id },
      include: { columns: true },
    });

    res.status(200).json({
      success: true,
      data: boards,
    });
  } catch (error) {
    next(error);
  }
};

export const getBoardById = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: req.resource,
    });
  } catch (error) {
    next(error);
  }
};

export const createBoard = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

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
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBoardById = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required and must be a non-empty string",
      });
    }

    const newBoard = await prisma.board.update({
      where: { id: req.resource.id },
      data: { title },
    });

    res.status(200).json({
      success: true,
      data: newBoard,
    });
  } catch (error) {
    next(error);
  }
};
