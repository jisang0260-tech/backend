import { sendEndpointScaffold } from "../../lib/sendEndpointScaffold.js";

export function listImages(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/images",
    screen: "메인 마켓 화면",
  });
}

export function searchImages(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/images/search",
    screen: "검색 화면",
  });
}

export function createImage(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "POST",
    path: "/images",
    screen: "이미지 업로드 화면",
  });
}

export function getImageById(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/images/{imageId}",
    screen: "이미지 상세 화면",
  });
}

export function getImageVerification(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/images/{imageId}/verification",
    screen: "이미지 상세 화면 검증 섹션",
  });
}

export function deleteImage(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "DELETE",
    path: "/images/{imageId}",
    screen: "내 업로드 이미지 화면",
  });
}

export function downloadImage(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "POST",
    path: "/images/{imageId}/download",
    screen: "다운로드 버튼",
  });
}

export function favoriteImage(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "POST",
    path: "/images/{imageId}/favorite",
    screen: "찜 화면",
  });
}

export function unfavoriteImage(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "DELETE",
    path: "/images/{imageId}/favorite",
    screen: "찜 화면",
  });
}
