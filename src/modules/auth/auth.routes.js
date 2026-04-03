import { redirectToGoogleLogin } from "./auth.controller.js";

export const authModule = {
  basePath: "/oauth2/authorization",
  routes: [
    {
      method: "get",
      path: "/google",
      name: "Login screen",
      handler: redirectToGoogleLogin,
    },
  ],
};
