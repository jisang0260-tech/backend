import { checkVerification } from "./verification.controller.js";

export const verificationModule = {
  basePath: "/verification",
  routes: [
    {
      method: "post",
      path: "/check",
      name: "Verification screen",
      handler: checkVerification,
    },
  ],
};
