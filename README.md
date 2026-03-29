# Node.js REST API Foundation

Express 기반으로 REST API 서버를 빠르게 확장할 수 있도록 만든 기본 골격입니다.

## 포함된 구성

- `openapi/openapi.yaml`: API 명세서
- `src/app.js`: Express 앱 구성
- `src/server.js`: 서버 실행 진입점
- `src/lib/registerRoutes.js`: URL + 메소드 기반 라우트 등록기
- `src/modules/*`: 기능 단위 모듈
- `src/middlewares/*`: 공통 에러 처리

## 시작 방법

```bash
npm install
copy .env.example .env
npm run dev
```

기본 실행 주소:

- API: `http://localhost:3000`
- Swagger UI: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/openapi.json`

## 현재 포함된 예시 API

- `GET /api/health`
- `GET /api/users`
- `GET /api/users/:userId`
- `POST /api/users`

## 새 API 추가 방법

1. `openapi/openapi.yaml`에 엔드포인트 명세를 추가합니다.
2. `src/modules/<module>/<module>.controller.js`에 핸들러를 작성합니다.
3. `src/modules/<module>/<module>.routes.js`에 `method`, `path`, `handler`를 등록합니다.
4. `src/modules/index.js`에 모듈을 연결합니다.

예시:

```js
export const exampleModule = {
  basePath: "/api/examples",
  routes: [
    {
      method: "get",
      path: "/",
      handler: listExamples,
    },
    {
      method: "post",
      path: "/",
      handler: createExample,
    },
  ],
};
```

## 구조 설명

`basePath`는 모듈 공통 URL prefix입니다. 실제 URL은 `basePath + path`로 조합됩니다.

예를 들어:

- `basePath: /api/users`
- `path: /:userId`
- `method: get`

이면 최종 엔드포인트는 `GET /api/users/:userId`가 됩니다.

## 참고

현재 `users` 모듈은 메모리 기반 예시 데이터로 동작합니다. 실제 서비스에서는 DB 레이어와 서비스 레이어를 추가해서 확장하면 됩니다.
