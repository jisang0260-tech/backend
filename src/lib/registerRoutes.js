import { Router } from "express";

function wrapHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function registerModules(app, modules) {
  modules.forEach((moduleDefinition) => {
    const router = Router();

    moduleDefinition.routes.forEach((route) => {
      const method = route.method.toLowerCase();
      const middlewares = route.middlewares || [];

      if (typeof router[method] !== "function") {
        throw new Error(`Unsupported HTTP method: ${route.method}`);
      }

      router[method](route.path, ...middlewares, wrapHandler(route.handler));
    });

    app.use(moduleDefinition.basePath, router);
  });
}
