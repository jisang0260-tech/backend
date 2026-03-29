import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`API server is running on http://localhost:${env.port}`);
  console.log(`Swagger UI is available at http://localhost:${env.port}/docs`);
});
