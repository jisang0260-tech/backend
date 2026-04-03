import { createHttpError } from "./createHttpError.js";

export function parsePositiveInteger(value, fieldName, { min = 0, required = true } = {}) {
  if (value === undefined || value === null || value === "") {
    if (!required) {
      return undefined;
    }

    throw createHttpError(400, `Invalid ${fieldName}.`);
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < min) {
    throw createHttpError(400, `Invalid ${fieldName}.`);
  }

  return parsed;
}

export function parsePrice(value, fieldName = "price") {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw createHttpError(400, `Invalid ${fieldName}.`);
  }

  return parsed;
}

export function parsePagination(query) {
  return {
    page: parsePositiveInteger(query.page ?? 0, "page"),
    size: parsePositiveInteger(query.size ?? 20, "size", { min: 1 }),
  };
}

export function parseImageId(params) {
  return parsePositiveInteger(params.imageId, "imageId", { min: 1 });
}

export function parseOrderId(value) {
  return parsePositiveInteger(value, "orderId", { min: 1 });
}

export function requireTrimmedString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw createHttpError(400, `Invalid ${fieldName}.`);
  }

  return value.trim();
}

export function optionalTrimmedString(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw createHttpError(400, "Invalid request body.");
  }

  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

export function validateEmail(value) {
  const email = requireTrimmedString(value, "email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw createHttpError(400, "Invalid email.");
  }

  return email;
}

export function pickAuthenticatedUser(req, findUserByToken) {
  const user = findUserByToken(req.accessToken);

  if (!user) {
    throw createHttpError(404, "User not found.");
  }

  return user;
}
