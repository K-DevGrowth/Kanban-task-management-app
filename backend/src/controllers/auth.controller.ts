import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPERIES, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "email or password is missing" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "email is existing" });
    }

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

    res.status(201).json({
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!passwordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPERIES,
    });

    res.status(200).json({
      success: true,
      data: {
        token,
        existingUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
