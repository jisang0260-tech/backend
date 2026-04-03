import { requireAuth } from "../../middlewares/requireAuth.js";
import { uploadSingleImage } from "../../middlewares/uploadImage.js";
import {
  createImage,
  deleteImage,
  downloadImage,
  favoriteImage,
  getImageById,
  getImageVerification,
  listImages,
  searchImages,
  unfavoriteImage,
} from "./images.controller.js";

export const imagesModule = {
  basePath: "/images",
  routes: [
    {
      method: "get",
      path: "/",
      name: "Main market screen",
      handler: listImages,
      middlewares: [requireAuth],
    },
    {
      method: "get",
      path: "/search",
      name: "Search screen",
      handler: searchImages,
      middlewares: [requireAuth],
    },
    {
      method: "post",
      path: "/",
      name: "Image upload screen",
      handler: createImage,
      middlewares: [requireAuth, uploadSingleImage],
    },
    {
      method: "get",
      path: "/:imageId/verification",
      name: "Image verification section",
      handler: getImageVerification,
      middlewares: [requireAuth],
    },
    {
      method: "post",
      path: "/:imageId/download",
      name: "Download button",
      handler: downloadImage,
      middlewares: [requireAuth],
    },
    {
      method: "post",
      path: "/:imageId/favorite",
      name: "Favorite add action",
      handler: favoriteImage,
      middlewares: [requireAuth],
    },
    {
      method: "delete",
      path: "/:imageId/favorite",
      name: "Favorite remove action",
      handler: unfavoriteImage,
      middlewares: [requireAuth],
    },
    {
      method: "get",
      path: "/:imageId",
      name: "Image detail screen",
      handler: getImageById,
      middlewares: [requireAuth],
    },
    {
      method: "delete",
      path: "/:imageId",
      name: "My uploaded images screen",
      handler: deleteImage,
      middlewares: [requireAuth],
    },
  ],
};
