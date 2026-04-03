import { sendEndpointScaffold } from "../../lib/sendEndpointScaffold.js";

export function redirectToGoogleLogin(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "GET",
    path: "/oauth2/authorization/google",
    screen: "로그인 화면",
  });
}
