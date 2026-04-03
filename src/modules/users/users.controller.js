import { sendEndpointScaffold } from "../../lib/sendEndpointScaffold.js";

export function signupUser(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "POST",
    path: "/users/signup",
    screen: "회원가입 화면",
  });
}

export function listMyImages(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/users/me/images",
    screen: "내 업로드 이미지 화면",
  });
}

export function listMyFavorites(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/users/me/favorites",
    screen: "찜 화면",
  });
}
