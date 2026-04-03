import {
  optionalTrimmedString,
  parseImageId,
  parseOrderId,
  parsePagination,
  parsePrice,
  requireTrimmedString,
} from "../../lib/apiHelpers.js";
import { createHttpError } from "../../lib/createHttpError.js";
import {
  addFavorite,
  buildDownloadResponse,
  createImage as createImageRecord,
  deleteImage as deleteImageRecord,
  findUserByToken,
  getImageById as getImageRecord,
  getImageDetail,
  getImageVerification as getImageVerificationRecord,
  getOrder,
  isFavorite,
  listMarketImages,
  removeFavorite,
  searchMarketImages,
} from "../../lib/mockStore.js";

function requireCurrentUser(req) {
  const user = findUserByToken(req.accessToken);

  if (!user) {
    throw createHttpError(404, "User not found.");
  }

  return user;
}

export function listImages(req, res) {
  const { page, size } = parsePagination(req.query);
  const sort = req.query.sort || "latest";
  const items = listMarketImages({ page, size, sort });

  if (!items) {
    throw createHttpError(400, "Invalid query parameter.");
  }

  return res.status(200).json(items);
}

export function searchImages(req, res) {
  const { page, size } = parsePagination(req.query);
  const keyword = optionalTrimmedString(req.query.keyword);
  const category = optionalTrimmedString(req.query.category)?.toUpperCase();

  return res.status(200).json(searchMarketImages({ keyword, category, page, size }));
}

export function createImage(req, res) {
  const user = requireCurrentUser(req);

  if (!req.file) {
    throw createHttpError(400, "Missing or invalid file.");
  }

  const title = requireTrimmedString(req.body?.title, "title");
  const description = optionalTrimmedString(req.body?.description);
  const price = parsePrice(req.body?.price);
  const category = requireTrimmedString(req.body?.category, "category").toUpperCase();
  const deviceId = optionalTrimmedString(req.body?.deviceId);
  const capturedAt = optionalTrimmedString(req.body?.capturedAt);

  if (capturedAt && Number.isNaN(Date.parse(capturedAt))) {
    throw createHttpError(400, "Invalid capturedAt.");
  }

  const createdImage = createImageRecord({
    sellerId: user.id,
    title,
    description,
    price,
    category,
    deviceId,
    capturedAt,
    originalFilename: req.file.originalname,
  });

  return res.status(201).json(createdImage);
}

export function getImageById(req, res) {
  const imageId = parseImageId(req.params);
  const currentUserId = findUserByToken(req.accessToken)?.id || null;
  const image = getImageDetail(imageId, currentUserId);

  if (!image) {
    throw createHttpError(404, "Image not found.");
  }

  return res.status(200).json(image);
}

export function getImageVerification(req, res) {
  const imageId = parseImageId(req.params);
  const verification = getImageVerificationRecord(imageId);

  if (!verification) {
    throw createHttpError(404, "Image not found.");
  }

  return res.status(200).json(verification);
}

export function deleteImage(req, res) {
  const user = requireCurrentUser(req);
  const imageId = parseImageId(req.params);
  const image = getImageRecord(imageId);

  if (!image) {
    throw createHttpError(404, "Image not found.");
  }

  if (image.sellerId !== user.id) {
    throw createHttpError(403, "You do not have permission to delete this image.");
  }

  deleteImageRecord(imageId);
  return res.status(204).send();
}

export function downloadImage(req, res) {
  const user = requireCurrentUser(req);
  const imageId = parseImageId(req.params);
  const orderId = parseOrderId(req.body?.orderId);
  const image = getImageRecord(imageId);
  const order = getOrder(orderId);

  if (!image) {
    throw createHttpError(404, "Image not found.");
  }

  if (!order) {
    throw createHttpError(404, "Image or order not found.");
  }

  if (order.userId !== user.id || order.imageId !== imageId) {
    throw createHttpError(403, "Only the purchasing user can download this image.");
  }

  return res.status(200).json(buildDownloadResponse({ imageId, orderId, userId: user.id }));
}

export function favoriteImage(req, res) {
  const user = requireCurrentUser(req);
  const imageId = parseImageId(req.params);

  if (!getImageRecord(imageId)) {
    throw createHttpError(404, "Image not found.");
  }

  if (isFavorite(user.id, imageId)) {
    throw createHttpError(409, "Image is already favorited.");
  }

  return res.status(200).json(addFavorite(user.id, imageId));
}

export function unfavoriteImage(req, res) {
  const user = requireCurrentUser(req);
  const imageId = parseImageId(req.params);

  if (!getImageRecord(imageId) || !removeFavorite(user.id, imageId)) {
    throw createHttpError(404, "Favorite image not found.");
  }

  return res.status(204).send();
}
