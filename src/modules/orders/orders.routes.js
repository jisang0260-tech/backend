import { requireAuth } from "../../middlewares/requireAuth.js";
import { createOrder } from "./orders.controller.js";

export const ordersModule = {
  basePath: "/orders",
  routes: [
    {
      method: "post",
      path: "/",
      name: "Purchase screen",
      handler: createOrder,
      middlewares: [requireAuth],
    },
  ],
};
