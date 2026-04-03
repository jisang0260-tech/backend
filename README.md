# Image Market API Scaffold

Express-based API scaffold with route modules only.

## Included endpoints

- `GET /oauth2/authorization/google`
- `POST /users/signup`
- `GET /images`
- `GET /images/search`
- `POST /images`
- `GET /images/:imageId`
- `GET /images/:imageId/verification`
- `GET /users/me/images`
- `DELETE /images/:imageId`
- `POST /orders`
- `POST /images/:imageId/download`
- `POST /verification/check`
- `POST /images/:imageId/favorite`
- `DELETE /images/:imageId/favorite`
- `GET /users/me/favorites`

Every endpoint is currently wired as a placeholder and returns `501 Not Implemented`.

## Swagger

- Swagger UI: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/openapi.json`

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

Root URL:

- API index: `http://localhost:3000/`
- Swagger UI: `http://localhost:3000/docs`

## Structure

- `src/app.js`: Express app setup
- `src/docs/openApiSpec.js`: OpenAPI spec for Swagger UI
- `src/lib/registerRoutes.js`: shared route registration
- `src/lib/sendEndpointScaffold.js`: placeholder response helper
- `src/modules/*`: domain-based route/controller skeletons
- `src/middlewares/*`: shared middleware
