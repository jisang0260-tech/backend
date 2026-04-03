import { listMyFavorites, listMyImages, signupUser } from "./users.controller.js";

export const usersModule = {
  basePath: "/users",
  routes: [
    {
      method: "post",
      path: "/signup",
      name: "Signup screen",
      handler: signupUser,
    },
    {
      method: "get",
      path: "/me/images",
      name: "My uploaded images screen",
      handler: listMyImages,
    },
    {
      method: "get",
      path: "/me/favorites",
      name: "Favorites screen",
      handler: listMyFavorites,
    },
  ],
};
