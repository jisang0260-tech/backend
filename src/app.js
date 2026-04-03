import express from "express";
import swaggerUi from "swagger-ui-express";

import { env } from "./config/env.js";
import { openApiSpec } from "./docs/openApiSpec.js";
import { registerModules } from "./lib/registerRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { apiModules } from "./modules/index.js";

const app = express();

function joinRoutePath(basePath, routePath) {
  const normalizedPath = `${basePath}${routePath}`.replace(/\/+/g, "/");
  return normalizedPath.length > 1 ? normalizedPath.replace(/\/$/, "") : normalizedPath;
}

const registeredEndpoints = apiModules.flatMap((moduleDefinition) =>
  moduleDefinition.routes.map((route) => ({
    method: route.method.toUpperCase(),
    path: joinRoutePath(moduleDefinition.basePath, route.path),
    name: route.name,
  })),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Image Market API mock is running.",
    environment: env.nodeEnv,
    docsUrl: "/docs",
    openApiUrl: "/openapi.json",
    endpoints: registeredEndpoints,
  });
});

app.get("/openapi.json", (_req, res) => {
  res.status(200).json(openApiSpec);
});

app.get(["/swagger-ui.html", "/swagger-ui", "/swagger-ui/index.html"], (req, res) => {
  const queryString = req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  res.redirect(302, `/docs${queryString}`);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec, { explorer: true }));

registerModules(app, apiModules);

app.use(notFound);
app.use(errorHandler);

export default app;
