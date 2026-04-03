import multer from "multer";

import { env } from "../config/env.js";

export function errorHandler(error, _req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof multer.MulterError) {
    const statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    const message = error.code === "LIMIT_FILE_SIZE" ? "File too large." : "Missing or invalid file.";

    return res.status(statusCode).json({ message });
  }

  const statusCode = error.statusCode || 500;
  const payload = {
    message: error.message || "Internal Server Error",
  };

  if (error.details) {
    payload.details = error.details;
  }

  if (env.nodeEnv !== "production" && error.stack) {
    payload.stack = error.stack;
  }

  return res.status(statusCode).json(payload);
}
