import { getHealth } from "./health.controller.js";

export const healthModule = {
  basePath: "/api/health",
  routes: [
    {
      method: "get",
      path: "/",
      handler: getHealth,
    },
  ],
};
