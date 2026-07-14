import { prisma } from "../lib/prisma.js";

export const getAll = async (req, res, next) => {
  const boards = await prisma.board.findMany();
  res.status(200).json(boards);
};

export const getOne = async (req, res, next) => {};

export const create = async (req, res, next) => {
  
};

export const remove = async (req, res, next) => {};

export const update = async (req, res, next) => {};
