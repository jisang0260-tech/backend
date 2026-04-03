import { parseImageId, requireTrimmedString } from "../../lib/apiHelpers.js";
import { createHttpError } from "../../lib/createHttpError.js";
import { createOrder as createOrderRecord, findUserByToken, getImageById } from "../../lib/mockStore.js";

export function createOrder(req, res) {
  const user = findUserByToken(req.accessToken);

  if (!user) {
    throw createHttpError(404, "User not found.");
  }

  const imageId = parseImageId({ imageId: req.body?.imageId });
  requireTrimmedString(req.body?.paymentMethod, "paymentMethod");
  const paymentMethod = String(req.body.paymentMethod).trim().toUpperCase();
  const image = getImageById(imageId);

  if (!image) {
    throw createHttpError(404, "Image not found.");
  }

  if (image.isSold) {
    throw createHttpError(409, "Image has already been purchased.");
  }

  const order = createOrderRecord(user.id, { imageId, paymentMethod });
  return res.status(201).json(order);
}
