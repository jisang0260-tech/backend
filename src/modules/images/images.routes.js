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
    },
    {
      method: "get",
      path: "/search",
      name: "Search screen",
      handler: searchImages,
    },
    {
      method: "post",
      path: "/",
      name: "Image upload screen",
      handler: createImage,
    },
    {
      method: "get",
      path: "/:imageId/verification",
      name: "Image verification section",
      handler: getImageVerification,
    },
    {
      method: "post",
      path: "/:imageId/download",
      name: "Download button",
      handler: downloadImage,
    },
    {
      method: "post",
      path: "/:imageId/favorite",
      name: "Favorite add action",
      handler: favoriteImage,
    },
    {
      method: "delete",
      path: "/:imageId/favorite",
      name: "Favorite remove action",
      handler: unfavoriteImage,
    },
    {
      method: "get",
      path: "/:imageId",
      name: "Image detail screen",
      handler: getImageById,
    },
    {
      method: "delete",
      path: "/:imageId",
      name: "My uploaded images screen",
      handler: deleteImage,
    },
  ],
};
