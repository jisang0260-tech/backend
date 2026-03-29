import { healthModule } from "./health/health.routes.js";
import { usersModule } from "./users/users.routes.js";

export const apiModules = [healthModule, usersModule];
