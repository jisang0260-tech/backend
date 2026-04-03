import { requireAuth } from "../../middlewares/requireAuth.js";
import {
  getMyProfile,
  listMyFavorites,
  listMyImages,
  listMyOrders,
  signupUser,
  updateMyProfile,
} from "./users.controller.js";

export const usersModule = {
  basePath: "/users",
  routes: [
    {
      method: "post",
      path: "/signup",
      name: "Signup screen",
      handler: signupUser,
      middlewares: [requireAuth],
    },
    {
      method: "get",
      path: "/me",
      name: "My profile screen",
      handler: getMyProfile,
      middlewares: [requireAuth],
    },
    {
      method: "patch",
      path: "/profile",
      name: "Profile edit screen",
      handler: updateMyProfile,
      middlewares: [requireAuth],
    },
    {
      method: "get",
      path: "/me/images",
      name: "My uploaded images screen",
      handler: listMyImages,
      middlewares: [requireAuth],
    },
    {
      method: "get",
      path: "/me/favorites",
      name: "Favorites screen",
      handler: listMyFavorites,
      middlewares: [requireAuth],
    },
    {
      method: "get",
      path: "/me/orders",
      name: "Order history screen",
      handler: listMyOrders,
      middlewares: [requireAuth],
    },
  ],
};
