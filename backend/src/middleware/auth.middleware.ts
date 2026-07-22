import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { prisma } from "../lib/prisma";

export const authorize = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;

    next();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(401).json({ message: "Unauthorized", error: message });
  }
};
