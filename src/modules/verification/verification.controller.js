import { createHttpError } from "../../lib/createHttpError.js";
import { checkUploadedImage } from "../../lib/mockStore.js";

export function checkVerification(req, res) {
  if (!req.file) {
    throw createHttpError(400, "Missing or invalid file.");
  }

  return res.status(200).json(checkUploadedImage(req.file));
}
