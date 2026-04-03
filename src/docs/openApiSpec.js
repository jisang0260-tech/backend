const placeholderResponse = {
  description: "Scaffold endpoint. Internal logic has not been implemented yet.",
  content: {
    "application/json": {
      schema: {
        $ref: "#/components/schemas/EndpointScaffoldResponse",
      },
    },
  },
};

const imageIdParameter = {
  name: "imageId",
  in: "path",
  required: true,
  schema: {
    type: "string",
  },
  description: "Image identifier",
};

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Image Market API Scaffold",
    version: "1.0.0",
    description: "Rough API structure for the image marketplace. All endpoints are currently placeholders.",
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
        summary: "Login screen",
        operationId: "redirectToGoogleLogin",
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/users/signup": {
      post: {
        tags: ["Users"],
        summary: "Signup screen",
        operationId: "signupUser",
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
          501: placeholderResponse,
        },
      },
    },
    "/users/me/images": {
      get: {
        tags: ["Users"],
        summary: "My uploaded images screen",
        operationId: "listMyImages",
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/users/me/favorites": {
      get: {
        tags: ["Users"],
        summary: "Favorites screen",
        operationId: "listMyFavorites",
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/images": {
      get: {
        tags: ["Images"],
        summary: "Main market screen",
        operationId: "listImages",
        responses: {
          501: placeholderResponse,
        },
      },
      post: {
        tags: ["Images"],
        summary: "Image upload screen",
        operationId: "createImage",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateImageRequest",
              },
            },
          },
        },
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/images/search": {
      get: {
        tags: ["Images"],
        summary: "Search screen",
        operationId: "searchImages",
        parameters: [
          {
            name: "q",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Search keyword",
          },
          {
            name: "tag",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Tag filter",
          },
          {
            name: "ownerId",
            in: "query",
            required: false,
            schema: { type: "string" },
            description: "Owner filter",
          },
          {
            name: "verified",
            in: "query",
            required: false,
            schema: { type: "boolean" },
            description: "Verification filter",
          },
        ],
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/images/{imageId}": {
      get: {
        tags: ["Images"],
        summary: "Image detail screen",
        operationId: "getImageById",
        parameters: [imageIdParameter],
        responses: {
          501: placeholderResponse,
        },
      },
      delete: {
        tags: ["Images"],
        summary: "Delete uploaded image",
        operationId: "deleteImage",
        parameters: [imageIdParameter],
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/images/{imageId}/verification": {
      get: {
        tags: ["Images"],
        summary: "Image verification section",
        operationId: "getImageVerification",
        parameters: [imageIdParameter],
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/images/{imageId}/download": {
      post: {
        tags: ["Images"],
        summary: "Download button",
        operationId: "downloadImage",
        parameters: [imageIdParameter],
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/images/{imageId}/favorite": {
      post: {
        tags: ["Images"],
        summary: "Add favorite",
        operationId: "favoriteImage",
        parameters: [imageIdParameter],
        responses: {
          501: placeholderResponse,
        },
      },
      delete: {
        tags: ["Images"],
        summary: "Remove favorite",
        operationId: "unfavoriteImage",
        parameters: [imageIdParameter],
        responses: {
          501: placeholderResponse,
        },
      },
    },
    "/orders": {
      post: {
        tags: ["Orders"],
        summary: "Purchase screen",
        operationId: "createOrder",
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
          501: placeholderResponse,
        },
      },
    },
    "/verification/check": {
      post: {
        tags: ["Verification"],
        summary: "Verification screen",
        operationId: "checkVerification",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/VerificationCheckRequest",
              },
            },
          },
        },
        responses: {
          501: placeholderResponse,
        },
      },
    },
  },
  components: {
    schemas: {
      EndpointScaffoldResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Endpoint scaffold only. Implement the internal logic later.",
          },
          screen: {
            type: "string",
            example: "Purchase screen",
          },
          endpoint: {
            type: "string",
            example: "POST /orders",
          },
          request: {
            type: "object",
            properties: {
              params: {
                type: "object",
                additionalProperties: true,
              },
              query: {
                type: "object",
                additionalProperties: true,
              },
              body: {
                type: "object",
                additionalProperties: true,
              },
            },
          },
        },
      },
      SignupRequest: {
        type: "object",
        properties: {
          name: { type: "string", example: "Jane" },
          email: { type: "string", format: "email", example: "jane@example.com" },
          password: { type: "string", format: "password", example: "password123" },
        },
      },
      CreateImageRequest: {
        type: "object",
        properties: {
          title: { type: "string", example: "Sunset Poster" },
          prompt: { type: "string", example: "cinematic sunset over Seoul skyline" },
          imageUrl: { type: "string", format: "uri", example: "https://example.com/images/sunset.jpg" },
          description: { type: "string", example: "Warm tone marketplace sample image." },
          tags: {
            type: "array",
            items: { type: "string" },
            example: ["sunset", "city", "poster"],
          },
          price: { type: "number", example: 4900 },
        },
      },
      CreateOrderRequest: {
        type: "object",
        properties: {
          imageId: { type: "string", example: "image-1" },
          paymentMethod: { type: "string", example: "card" },
        },
      },
      VerificationCheckRequest: {
        type: "object",
        properties: {
          imageId: { type: "string", example: "image-1" },
        },
      },
    },
  },
};
