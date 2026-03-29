import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parse } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const openApiPath = path.resolve(__dirname, "../../openapi/openapi.yaml");

export function loadOpenApiSpec() {
  const source = fs.readFileSync(openApiPath, "utf8");
  return parse(source);
}
