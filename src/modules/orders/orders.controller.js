import { sendEndpointScaffold } from "../../lib/sendEndpointScaffold.js";

export function createOrder(req, res) {
  return sendEndpointScaffold(req, res, {
    method: "POST",
    path: "/orders",
    screen: "구매 화면",
  });
}
