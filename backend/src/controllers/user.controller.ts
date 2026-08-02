import { prisma } from "../lib/prisma.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { boards: true },
    });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
