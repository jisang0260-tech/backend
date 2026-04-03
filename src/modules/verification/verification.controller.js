import { sendEndpointScaffold } from "../../lib/sendEndpointScaffold.js";

export function checkVerification(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "POST",
    path: "/verification/check",
    screen: "검증 화면",
  });
}
