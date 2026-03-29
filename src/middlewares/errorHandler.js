import { env } from "../config/env.js";

export function errorHandler(error, _req, res, next) {
  if (res.headersSent) {
    return next(error);
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
