export function sendEndpointScaffold(req, res, { method, path, screen }) {
  return res.status(501).json({
    message: "Endpoint scaffold only. Implement the internal logic later.",
    screen,
    endpoint: `${method} ${path}`,
    request: {
      params: req.params,
      query: req.query,
      body: req.body,
    },
  });
}
