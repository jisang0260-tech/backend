import { authModule } from "./auth/auth.routes.js";
import { imagesModule } from "./images/images.routes.js";
import { ordersModule } from "./orders/orders.routes.js";
import { usersModule } from "./users/users.routes.js";
import { verificationModule } from "./verification/verification.routes.js";

export const apiModules = [authModule, usersModule, imagesModule, ordersModule, verificationModule];
