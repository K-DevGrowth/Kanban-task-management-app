import { Prisma } from "../../generated/prisma/client";

export const errorMiddleware = (err, req, res, next) => {
  try {
    console.error(err);
    
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002": {
          return res.status(409).json({
            status: "fail",
            message: `Duplicate value for field: ${err?.meta?.target || "unknown"}`,
          });
        }

        case "P2025": {
          return res.status(404).json({
            status: "fail",
            message: err.meta?.cause || "Record not found in the database",
          });
        }

        case "P2003": {
          return res.status(400).json({
            status: "fail",
            message: `Foreign key constraint failed on the field: ${err?.meta?.field_name || "unknown"}`,
          });
        }

        default: {
          return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
          });
        }
      }
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        status: "fail",
        message:
          "Validation error: Invalid fields or incorrect data types provided",
      });
    }

    return res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};
