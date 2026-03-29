import express from "express";
import swaggerUi from "swagger-ui-express";

import { loadOpenApiSpec } from "./docs/loadOpenApi.js";
import { registerModules } from "./lib/registerRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { apiModules } from "./modules/index.js";

const app = express();
const openApiSpec = loadOpenApiSpec();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/openapi.json", (_req, res) => {
  res.status(200).json(openApiSpec);
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec, { explorer: true }));

registerModules(app, apiModules);

app.use(notFound);
app.use(errorHandler);

export default app;
