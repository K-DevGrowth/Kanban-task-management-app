import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPERIES, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPERIES,
  });

  const { password: _, ...safeUser } = user;

  res.status(201).json({
    success: true,
    data: {
      token,
      user: safeUser,
    },
  });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  const passwordCorrect = await bcrypt.compare(password, user.password);
  if (!passwordCorrect) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPERIES,
  });

  const { password: _, ...safeUser } = user;

  res.status(200).json({
    success: true,
    data: {
      token,
      user: safeUser,
    },
  });
};

export const signOut = async (req, res, next) => {};

export const forgotPassword = async (req, res, next) => {};
