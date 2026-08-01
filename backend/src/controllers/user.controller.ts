import { prisma } from "../lib/prisma.js";

export const getAllUsers = async (req, res, next) => {
  const users = await prisma.user.findMany({ include: { boards: true } });
  res.status(200).json(users);
};
