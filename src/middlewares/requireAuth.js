import { createHttpError } from "../lib/createHttpError.js";
import { mockTokens } from "../lib/mockStore.js";

export function requireAuth(req, _res, next) {
  const authorization = req.headers.authorization || "";

  if (!authorization.startsWith("Bearer ")) {
    return next(createHttpError(401, "Authentication is required."));
  }

  const accessToken = authorization.slice("Bearer ".length).trim();

  if (!accessToken || accessToken === mockTokens.invalid) {
    return next(createHttpError(401, "Authentication is required."));
  }

  req.accessToken = accessToken;
  return next();
}
