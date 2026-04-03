const bearerSecurity = [{ bearerAuth: [] }];

const imageIdParameter = {
  name: "imageId",
  in: "path",
  required: true,
  schema: {
    type: "integer",
    example: 101,
  },
  description: "Image ID",
};

const pageParameter = {
  name: "page",
  in: "query",
  required: false,
  schema: {
    type: "integer",
    minimum: 0,
    default: 0,
  },
  description: "Zero-based page index",
};

const sizeParameter = {
  name: "size",
  in: "query",
  required: false,
  schema: {
    type: "integer",
    minimum: 1,
    default: 20,
  },
  description: "Page size",
};

const errorResponse = {
  description: "Error response",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/ErrorResponse",
      },
    },
  },
};

function jsonResponse(description, schemaRef) {
  return {
    description,
    content: {
      "application/json": {
        schema: {
          $ref: schemaRef,
        },
      },
    },
  };
}

function jsonArrayResponse(description, schemaRef) {
  return {
    description,
    content: {
      "application/json": {
        schema: {
          type: "array",
          items: {
            $ref: schemaRef,
          },
        },
      },
    },
  };
}

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Image Market API",
    version: "1.1.0",
    description: "Mock Express API based on the provided marketplace scenario document.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local development server",
    },
  ],
  tags: [
    { name: "Auth" },
    { name: "Users" },
    { name: "Images" },
    { name: "Orders" },
    { name: "Verification" },
  ],
  paths: {
    "/oauth2/authorization/google": {
      get: {
        tags: ["Auth"],
        summary: "Redirect to Google OAuth login",
        operationId: "redirectToGoogleLogin",
        responses: {
          302: {
            description: "Redirect response",
            headers: {
              Location: {
                description: "Google OAuth URL",
                schema: {
                  type: "string",
                  format: "uri",
                },
              },
            },
          },
          400: errorResponse,
          401: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/users/signup": {
      post: {
        tags: ["Users"],
        summary: "신규 회원 가입",
        operationId: "signupUser",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignupRequest",
              },
            },
          },
        },
        responses: {
          201: jsonResponse("Signup success", "#/components/schemas/UserBasic"),
          400: errorResponse,
          401: errorResponse,
          409: errorResponse,
        },
      },
    },
    "/users/me": {
      get: {
        tags: ["Users"],
        summary: "현재 유저 정보 가져오기",
        operationId: "getMyProfile",
        security: bearerSecurity,
        responses: {
          200: jsonResponse("Current user", "#/components/schemas/UserProfile"),
          401: errorResponse,
          404: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/users/profile": {
      patch: {
        tags: ["Users"],
        summary: "현재 유저 정보 수정",
        operationId: "updateMyProfile",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateProfileRequest",
              },
            },
          },
        },
        responses: {
          200: jsonResponse("Updated user", "#/components/schemas/UserBasic"),
          400: errorResponse,
          401: errorResponse,
          409: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/users/me/images": {
      get: {
        tags: ["Users"],
        summary: "현재 유저가 업로드 한 이미지 조회",
        operationId: "listMyImages",
        security: bearerSecurity,
        parameters: [pageParameter, sizeParameter],
        responses: {
          200: jsonArrayResponse("Uploaded images", "#/components/schemas/MyImageCard"),
          400: errorResponse,
          401: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/users/me/favorites": {
      get: {
        tags: ["Users"],
        summary: "이미지 찜 조회",
        operationId: "listMyFavorites",
        security: bearerSecurity,
        parameters: [pageParameter, sizeParameter],
        responses: {
          200: jsonArrayResponse("Favorite images", "#/components/schemas/FavoriteImageCard"),
          400: errorResponse,
          401: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/users/me/orders": {
      get: {
        tags: ["Users"],
        summary: "내 구매내역 조회",
        operationId: "listMyOrders",
        security: bearerSecurity,
        parameters: [pageParameter, sizeParameter],
        responses: {
          200: jsonArrayResponse("Order history", "#/components/schemas/OrderHistoryItem"),
          400: errorResponse,
          401: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/images": {
      get: {
        tags: ["Images"],
        summary: "전체 이미지 조회",
        operationId: "listImages",
        security: bearerSecurity,
        parameters: [
          pageParameter,
          sizeParameter,
          {
            name: "sort",
            in: "query",
            required: false,
            schema: {
              type: "string",
              enum: ["latest", "price", "popular"],
              default: "latest",
            },
            description: "Sort strategy",
          },
        ],
        responses: {
          200: jsonArrayResponse("Marketplace images", "#/components/schemas/ImageCard"),
          400: errorResponse,
          401: errorResponse,
          500: errorResponse,
        },
      },
      post: {
        tags: ["Images"],
        summary: "이미지 업로드",
        operationId: "createImage",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["image", "title", "price", "category"],
                properties: {
                  image: {
                    type: "string",
                    format: "binary",
                  },
                  title: {
                    type: "string",
                    example: "Han River Night View",
                  },
                  description: {
                    type: "string",
                    example: "A night skyline photo captured along the Han River.",
                  },
                  price: {
                    type: "number",
                    example: 5000,
                  },
                  category: {
                    type: "string",
                    example: "LANDSCAPE",
                  },
                  deviceId: {
                    type: "string",
                    example: "device-abc-123",
                  },
                  capturedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2026-03-29T14:30:00Z",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: jsonResponse("Upload success", "#/components/schemas/CreateImageResponse"),
          400: errorResponse,
          401: errorResponse,
          413: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/images/search": {
      get: {
        tags: ["Images"],
        summary: "이미지 검색",
        operationId: "searchImages",
        security: bearerSecurity,
        parameters: [
          {
            name: "keyword",
            in: "query",
            schema: {
              type: "string",
            },
            description: "Keyword matched against title and description",
          },
          {
            name: "category",
            in: "query",
            schema: {
              type: "string",
            },
            description: "Image category",
          },
          pageParameter,
          sizeParameter,
        ],
        responses: {
          200: jsonArrayResponse("Search result", "#/components/schemas/FavoriteImageCard"),
          400: errorResponse,
          401: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/images/{imageId}": {
      get: {
        tags: ["Images"],
        summary: "이미지 상세 조회",
        operationId: "getImageById",
        security: bearerSecurity,
        parameters: [imageIdParameter],
        responses: {
          200: jsonResponse("Image detail", "#/components/schemas/ImageDetail"),
          400: errorResponse,
          401: errorResponse,
          404: errorResponse,
          500: errorResponse,
        },
      },
      delete: {
        tags: ["Images"],
        summary: "업로드한 이미지 삭제",
        operationId: "deleteImage",
        security: bearerSecurity,
        parameters: [imageIdParameter],
        responses: {
          204: {
            description: "Delete success",
          },
          400: errorResponse,
          401: errorResponse,
          403: errorResponse,
          404: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/images/{imageId}/verification": {
      get: {
        tags: ["Images"],
        summary: "블록체인 검증.",
        operationId: "getImageVerification",
        security: bearerSecurity,
        parameters: [imageIdParameter],
        responses: {
          200: jsonResponse("Verification record", "#/components/schemas/VerificationRecord"),
          400: errorResponse,
          401: errorResponse,
          404: errorResponse,
        },
      },
    },
    "/images/{imageId}/download": {
      post: {
        tags: ["Images"],
        summary: "이미지 다운로드",
        operationId: "downloadImage",
        security: bearerSecurity,
        parameters: [imageIdParameter],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/DownloadRequest",
              },
            },
          },
        },
        responses: {
          200: jsonResponse("Download URL", "#/components/schemas/DownloadResponse"),
          400: errorResponse,
          401: errorResponse,
          403: errorResponse,
          404: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/images/{imageId}/favorite": {
      post: {
        tags: ["Images"],
        summary: "이미지 찜",
        operationId: "favoriteImage",
        security: bearerSecurity,
        parameters: [imageIdParameter],
        responses: {
          200: jsonResponse("Favorite result", "#/components/schemas/FavoriteResponse"),
          400: errorResponse,
          401: errorResponse,
          404: errorResponse,
          409: errorResponse,
          500: errorResponse,
        },
      },
      delete: {
        tags: ["Images"],
        summary: "이미지 찜 취소",
        operationId: "unfavoriteImage",
        security: bearerSecurity,
        parameters: [imageIdParameter],
        responses: {
          204: {
            description: "Favorite removed",
          },
          400: errorResponse,
          401: errorResponse,
          404: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/orders": {
      post: {
        tags: ["Orders"],
        summary: "이미지 구매",
        operationId: "createOrder",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateOrderRequest",
              },
            },
          },
        },
        responses: {
          201: jsonResponse("Order created", "#/components/schemas/OrderResponse"),
          400: errorResponse,
          401: errorResponse,
          404: errorResponse,
          409: errorResponse,
          500: errorResponse,
        },
      },
    },
    "/verification/check": {
      post: {
        tags: ["Verification"],
        summary: "이미지 검증",
        operationId: "checkVerification",
        security: bearerSecurity,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["image"],
                properties: {
                  image: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Verification result",
            content: {
              "application/json": {
                schema: {
                  oneOf: [
                    { $ref: "#/components/schemas/VerificationMatchedResponse" },
                    { $ref: "#/components/schemas/VerificationMismatchResponse" },
                  ],
                },
              },
            },
          },
          400: errorResponse,
          401: errorResponse,
          413: errorResponse,
          500: errorResponse,
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description:"master1,master2,master3로 Authorize 하시면 됩니다"
      },
    },
    schemas: {
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Authentication is required.",
          },
        },
      },
      UserBasic: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Hong Gildong" },
          email: { type: "string", format: "email", example: "hong@example.com" },
          nickname: { type: "string", example: "photo_creator" },
        },
      },
      UserProfile: {
        allOf: [
          { $ref: "#/components/schemas/UserBasic" },
          {
            type: "object",
            properties: {
              profileImageUrl: {
                type: "string",
                format: "uri",
                example: "https://cdn.example.com/profiles/1.png",
              },
            },
          },
        ],
      },
      SignupRequest: {
        type: "object",
        required: ["name", "email", "nickname"],
        properties: {
          name: { type: "string", example: "Hong Gildong" },
          email: { type: "string", format: "email", example: "hong@example.com" },
          nickname: { type: "string", example: "photo_creator" },
        },
      },
      UpdateProfileRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "Hong Gilsun" },
          nickname: { type: "string", example: "creator_hong" },
        },
      },
      ImageCard: {
        type: "object",
        properties: {
          id: { type: "integer", example: 101 },
          title: { type: "string", example: "Han River Night View" },
          thumbnailUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-thumb.jpg",
          },
          price: { type: "number", example: 5000 },
          verificationStatus: { type: "string", example: "VERIFIED" },
          isSold: { type: "boolean", example: false },
        },
      },
      FavoriteImageCard: {
        type: "object",
        properties: {
          id: { type: "integer", example: 101 },
          title: { type: "string", example: "Han River Night View" },
          thumbnailUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-thumb.jpg",
          },
          price: { type: "number", example: 5000 },
          verificationStatus: { type: "string", example: "VERIFIED" },
        },
      },
      MyImageCard: {
        allOf: [
          { $ref: "#/components/schemas/ImageCard" },
          {
            type: "object",
            properties: {
              createdAt: {
                type: "string",
                format: "date-time",
                example: "2026-03-29T14:31:10Z",
              },
            },
          },
        ],
      },
      SellerSummary: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nickname: { type: "string", example: "photo_creator" },
        },
      },
      ImageVerificationPreview: {
        type: "object",
        properties: {
          status: { type: "string", example: "VERIFIED" },
          imageHash: { type: "string", example: "0x8f12ab34cd56ef" },
          timestamp: { type: "string", format: "date-time", example: "2026-03-29T14:31:10Z" },
          deviceId: { type: "string", example: "device-abc-123" },
          txHash: { type: "string", example: "0xa12345bcd67890" },
          blockNumber: { type: "integer", example: 245 },
        },
      },
      ImageDetail: {
        type: "object",
        properties: {
          id: { type: "integer", example: 101 },
          title: { type: "string", example: "Han River Night View" },
          description: { type: "string", example: "A night skyline photo captured along the Han River." },
          imageUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-original.jpg",
          },
          thumbnailUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-thumb.jpg",
          },
          price: { type: "number", example: 5000 },
          category: { type: "string", example: "LANDSCAPE" },
          seller: { $ref: "#/components/schemas/SellerSummary" },
          verification: { $ref: "#/components/schemas/ImageVerificationPreview" },
          isOwner: { type: "boolean", example: false },
          isSold: { type: "boolean", example: false },
        },
      },
      VerificationRecord: {
        type: "object",
        properties: {
          imageId: { type: "integer", example: 101 },
          verificationStatus: { type: "string", example: "VERIFIED" },
          imageHash: { type: "string", example: "0x8f12ab34cd56ef" },
          txHash: { type: "string", example: "0xa12345bcd67890" },
          blockNumber: { type: "integer", example: 245 },
          contractAddress: { type: "string", example: "0x9876543210abcdef" },
          registeredAt: { type: "string", format: "date-time", example: "2026-03-29T14:31:10Z" },
        },
      },
      CreateImageResponse: {
        type: "object",
        properties: {
          id: { type: "integer", example: 101 },
          title: { type: "string", example: "Han River Night View" },
          imageUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-original.jpg",
          },
          thumbnailUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-thumb.jpg",
          },
          price: { type: "number", example: 5000 },
          imageHash: { type: "string", example: "0x8f12ab34cd56ef" },
          verificationStatus: { type: "string", example: "VERIFIED" },
          txHash: { type: "string", example: "0xa12345bcd67890" },
          createdAt: { type: "string", format: "date-time", example: "2026-03-29T14:31:10Z" },
        },
      },
      FavoriteResponse: {
        type: "object",
        properties: {
          imageId: { type: "integer", example: 101 },
          favorited: { type: "boolean", example: true },
        },
      },
      CreateOrderRequest: {
        type: "object",
        required: ["imageId", "paymentMethod"],
        properties: {
          imageId: { type: "integer", example: 101 },
          paymentMethod: { type: "string", example: "CARD" },
        },
      },
      OrderResponse: {
        type: "object",
        properties: {
          orderId: { type: "integer", example: 9001 },
          imageId: { type: "integer", example: 101 },
          price: { type: "number", example: 5000 },
          orderStatus: { type: "string", example: "PAID" },
          purchasedAt: { type: "string", format: "date-time", example: "2026-03-29T15:00:00Z" },
        },
      },
      OrderHistoryItem: {
        type: "object",
        properties: {
          orderId: { type: "integer", example: 9001 },
          imageId: { type: "integer", example: 101 },
          title: { type: "string", example: "Han River Night View" },
          thumbnailUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/images/101-thumb.jpg",
          },
          price: { type: "number", example: 5000 },
          orderStatus: { type: "string", example: "PAID" },
          purchasedAt: { type: "string", format: "date-time", example: "2026-03-29T15:00:00Z" },
        },
      },
      DownloadRequest: {
        type: "object",
        required: ["orderId"],
        properties: {
          orderId: { type: "integer", example: 9001 },
        },
      },
      WatermarkInfo: {
        type: "object",
        properties: {
          applied: { type: "boolean", example: true },
          text: { type: "string", example: "Purchased by user22" },
          position: { type: "string", example: "bottom-right" },
        },
      },
      DownloadResponse: {
        type: "object",
        properties: {
          downloadUrl: {
            type: "string",
            format: "uri",
            example: "https://cdn.example.com/downloads/101-watermarked-22.jpg",
          },
          expiresAt: {
            type: "string",
            format: "date-time",
            example: "2026-03-29T15:10:00Z",
          },
          watermark: {
            $ref: "#/components/schemas/WatermarkInfo",
          },
        },
      },
      VerificationMatchedResponse: {
        type: "object",
        properties: {
          isVerified: { type: "boolean", example: true },
          verificationStatus: { type: "string", example: "MATCHED" },
          imageId: { type: "integer", example: 101 },
          imageHash: { type: "string", example: "0x8f12ab34cd56ef" },
          txHash: { type: "string", example: "0xa12345bcd67890" },
        },
      },
      VerificationMismatchResponse: {
        type: "object",
        properties: {
          isVerified: { type: "boolean", example: false },
          verificationStatus: { type: "string", example: "NOT_MATCHED" },
          imageHash: { type: "string", example: "0x999999999999" },
          reason: {
            type: "string",
            example: "The uploaded image hash does not match any registered blockchain record.",
          },
        },
      },
    },
  },
};
