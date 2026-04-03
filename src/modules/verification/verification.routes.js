import { requireAuth } from "../../middlewares/requireAuth.js";
import { uploadSingleImage } from "../../middlewares/uploadImage.js";
import { checkVerification } from "./verification.controller.js";

export const verificationModule = {
  basePath: "/verification",
  routes: [
    {
      method: "post",
      path: "/check",
      name: "Verification screen",
      handler: checkVerification,
      middlewares: [requireAuth, uploadSingleImage],
    },
  ],
};
