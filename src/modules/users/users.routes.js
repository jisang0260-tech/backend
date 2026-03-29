import { createUser, getUserById, listUsers } from "./users.controller.js";

export const usersModule = {
  basePath: "/api/users",
  routes: [
    {
      method: "get",
      path: "/",
      handler: listUsers,
    },
    {
      method: "get",
      path: "/:userId",
      handler: getUserById,
    },
    {
      method: "post",
      path: "/",
      handler: createUser,
    },
  ],
};
