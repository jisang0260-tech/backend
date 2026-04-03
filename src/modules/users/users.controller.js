import {
  optionalTrimmedString,
  parsePagination,
  pickAuthenticatedUser,
  requireTrimmedString,
  validateEmail,
} from "../../lib/apiHelpers.js";
import { createHttpError } from "../../lib/createHttpError.js";
import {
  createUserForToken,
  findUserByToken,
  hasEmailConflict,
  hasNicknameConflict,
  listFavoriteImages,
  listMyImages as listOwnedImages,
  listOrders,
  updateUserProfile,
} from "../../lib/mockStore.js";

function serializeUser(user, { includeProfileImage = false } = {}) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    nickname: user.nickname,
  };

  if (includeProfileImage) {
    payload.profileImageUrl = user.profileImageUrl;
  }

  return payload;
}

export function signupUser(req, res) {
  const existingUser = findUserByToken(req.accessToken);

  if (existingUser) {
    throw createHttpError(409, "User already signed up.");
  }

  const name = requireTrimmedString(req.body?.name, "name");
  const email = validateEmail(req.body?.email);
  const nickname = requireTrimmedString(req.body?.nickname, "nickname");

  if (hasEmailConflict(email) || hasNicknameConflict(nickname)) {
    throw createHttpError(409, "Email or nickname already exists.");
  }

  const createdUser = createUserForToken(req.accessToken, { name, email, nickname });
  return res.status(201).json(serializeUser(createdUser));
}

export function getMyProfile(req, res) {
  const user = pickAuthenticatedUser(req, findUserByToken);
  return res.status(200).json(serializeUser(user, { includeProfileImage: true }));
}

export function updateMyProfile(req, res) {
  const user = pickAuthenticatedUser(req, findUserByToken);
  const name = optionalTrimmedString(req.body?.name);
  const nickname = optionalTrimmedString(req.body?.nickname);

  if (name === undefined && nickname === undefined) {
    throw createHttpError(400, "Invalid request body.");
  }

  if (nickname !== undefined && hasNicknameConflict(nickname, user.id)) {
    throw createHttpError(409, "Nickname already exists.");
  }

  const updatedUser = updateUserProfile(user.id, { name, nickname });
  return res.status(200).json(serializeUser(updatedUser));
}

export function listMyImages(req, res) {
  const user = pickAuthenticatedUser(req, findUserByToken);
  const { page, size } = parsePagination(req.query);
  return res.status(200).json(listOwnedImages(user.id, { page, size }));
}

export function listMyFavorites(req, res) {
  const user = pickAuthenticatedUser(req, findUserByToken);
  const { page, size } = parsePagination(req.query);
  return res.status(200).json(listFavoriteImages(user.id, { page, size }));
}

export function listMyOrders(req, res) {
  const user = pickAuthenticatedUser(req, findUserByToken);
  const { page, size } = parsePagination(req.query);
  return res.status(200).json(listOrders(user.id, { page, size }));
}
