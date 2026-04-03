# blockchain project

Express-based.

## Included endpoints

- `GET /oauth2/authorization/google`
- `POST /users/signup`
- `GET /users/me`
- `PATCH /users/profile`
- `GET /users/me/images`
- `GET /users/me/favorites`
- `GET /users/me/orders`
- `GET /images`
- `GET /images/search`
- `POST /images`
- `GET /images/:imageId`
- `GET /images/:imageId/verification`
- `DELETE /images/:imageId`
- `POST /images/:imageId/download`
- `POST /images/:imageId/favorite`
- `DELETE /images/:imageId/favorite`
- `POST /orders`
- `POST /verification/check`


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

## Notes

- All data is stored in memory, so server restart resets users, favorites, orders, and uploaded images.
- Multipart upload endpoints use `multer` and expect the file field name `image`.
- Verification matching is mocked. A filename containing `match`, `hangang`, or `101` returns a matched verification result.

## Structure

- `src/app.js`: Express app setup
- `src/docs/openApiSpec.js`: OpenAPI spec for Swagger UI
- `src/lib/mockStore.js`: in-memory mock data and domain helpers
- `src/lib/registerRoutes.js`: shared route registration
- `src/modules/*`: domain-based route/controller implementations
- `src/middlewares/*`: auth, upload, and error middlewares
