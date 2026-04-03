import crypto from "node:crypto";

const users = [
  {
    id: 1,
    authToken: "master1",
    name: "Hong Gildong",
    email: "hong@example.com",
    nickname: "photo_creator",
    profileImageUrl: "https://cdn.example.com/profiles/1.png",
  },
  {
    id: 2,
    authToken: "master2",
    name: "Kim Minjun",
    email: "minjun@example.com",
    nickname: "night_snapper",
    profileImageUrl: "https://cdn.example.com/profiles/2.png",
  },
  {
    id: 3,
    authToken: "master3",
    name: "Park Seoyeon",
    email: "seoyeon@example.com",
    nickname: "user22",
    profileImageUrl: "https://cdn.example.com/profiles/3.png",
  },
];

const images = [
  {
    id: 101,
    title: "Han River Night View",
    description: "A night skyline photo captured along the Han River.",
    imageUrl: "https://cdn.example.com/images/101-original.jpg",
    thumbnailUrl: "https://cdn.example.com/images/101-thumb.jpg",
    price: 5000,
    category: "LANDSCAPE",
    sellerId: 1,
    verificationStatus: "VERIFIED",
    imageHash: "0x8f12ab34cd56ef",
    txHash: "0xa12345bcd67890",
    blockNumber: 245,
    contractAddress: "0x9876543210abcdef",
    deviceId: "device-abc-123",
    createdAt: "2026-03-29T14:31:10Z",
    isSold: false,
  },
  {
    id: 102,
    title: "Downtown Street",
    description: "A reflective downtown street shot after rainfall.",
    imageUrl: "https://cdn.example.com/images/102-original.jpg",
    thumbnailUrl: "https://cdn.example.com/images/102-thumb.jpg",
    price: 3000,
    category: "STREET",
    sellerId: 2,
    verificationStatus: "VERIFIED",
    imageHash: "0x4b22de91aa39cc",
    txHash: "0xb98765efd43210",
    blockNumber: 246,
    contractAddress: "0x9876543210abcdef",
    deviceId: "device-city-202",
    createdAt: "2026-03-30T11:12:13Z",
    isSold: false,
  },
  {
    id: 103,
    title: "Early Morning Beach",
    description: "A calm beach image captured at sunrise.",
    imageUrl: "https://cdn.example.com/images/103-original.jpg",
    thumbnailUrl: "https://cdn.example.com/images/103-thumb.jpg",
    price: 7000,
    category: "TRAVEL",
    sellerId: 2,
    verificationStatus: "VERIFIED",
    imageHash: "0xcafebabefeed12",
    txHash: "0xc7777777777777",
    blockNumber: 247,
    contractAddress: "0x9876543210abcdef",
    deviceId: "device-beach-303",
    createdAt: "2026-03-28T09:00:00Z",
    isSold: true,
  },
];

const favoritesByUserId = new Map([
  [1, new Set([102])],
  [2, new Set([101])],
  [3, new Set([101])],
]);

const orders = [
  {
    orderId: 9001,
    userId: 1,
    imageId: 103,
    price: 7000,
    paymentMethod: "CARD",
    orderStatus: "PAID",
    purchasedAt: "2026-03-29T15:00:00Z",
  },
];

let nextUserId = 4;
let nextImageId = 104;
let nextOrderId = 9002;

export const mockTokens = {
  creator: "access-token-photo-creator",
  seller: "access-token-night-snapper",
  buyer: "access-token-buyer",
  newUser: "new-user-token",
  invalid: "invalid-token",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function hashValue(value) {
  return `0x${crypto.createHash("sha256").update(value).digest("hex").slice(0, 14)}`;
}

function favoriteCount(imageId) {
  let count = 0;

  favoritesByUserId.forEach((favorites) => {
    if (favorites.has(imageId)) {
      count += 1;
    }
  });

  return count;
}

function findImageInternal(imageId) {
  return images.find((image) => image.id === imageId) || null;
}

function findOrderInternal(orderId) {
  return orders.find((order) => order.orderId === orderId) || null;
}

function userSummary(userId) {
  const user = users.find((item) => item.id === userId);
  return user ? { id: user.id, nickname: user.nickname } : null;
}

function imageSummary(image) {
  return {
    id: image.id,
    title: image.title,
    thumbnailUrl: image.thumbnailUrl,
    price: image.price,
    verificationStatus: image.verificationStatus,
    isSold: image.isSold,
  };
}

function favoriteSummary(image) {
  return {
    id: image.id,
    title: image.title,
    thumbnailUrl: image.thumbnailUrl,
    price: image.price,
    verificationStatus: image.verificationStatus,
  };
}

function myImageSummary(image) {
  return {
    id: image.id,
    title: image.title,
    thumbnailUrl: image.thumbnailUrl,
    price: image.price,
    verificationStatus: image.verificationStatus,
    isSold: image.isSold,
    createdAt: image.createdAt,
  };
}

function detailPayload(image, currentUserId) {
  return {
    id: image.id,
    title: image.title,
    description: image.description,
    imageUrl: image.imageUrl,
    thumbnailUrl: image.thumbnailUrl,
    price: image.price,
    category: image.category,
    seller: userSummary(image.sellerId),
    verification: {
      status: image.verificationStatus,
      imageHash: image.imageHash,
      timestamp: image.createdAt,
      deviceId: image.deviceId || null,
      txHash: image.txHash,
      blockNumber: image.blockNumber,
    },
    isOwner: image.sellerId === currentUserId,
    isSold: image.isSold,
  };
}

function verificationPayload(image) {
  return {
    imageId: image.id,
    verificationStatus: image.verificationStatus,
    imageHash: image.imageHash,
    txHash: image.txHash,
    blockNumber: image.blockNumber,
    contractAddress: image.contractAddress,
    registeredAt: image.createdAt,
  };
}

function orderSummary(order) {
  const image = findImageInternal(order.imageId);

  return {
    orderId: order.orderId,
    imageId: order.imageId,
    title: image?.title || "Deleted image",
    thumbnailUrl: image?.thumbnailUrl || null,
    price: order.price,
    orderStatus: order.orderStatus,
    purchasedAt: order.purchasedAt,
  };
}

function paginate(items, { page, size }) {
  const start = page * size;
  return items.slice(start, start + size);
}

function sortedImages(sort) {
  const list = [...images];

  switch (sort) {
    case "latest":
      return list.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
    case "price":
      return list.sort((left, right) => left.price - right.price);
    case "popular":
      return list.sort((left, right) => favoriteCount(right.id) - favoriteCount(left.id));
    default:
      return null;
  }
}

export function findUserByToken(token) {
  return clone(users.find((user) => user.authToken === token) || null);
}

export function createUserForToken(token, { name, email, nickname }) {
  const user = {
    id: nextUserId,
    authToken: token,
    name,
    email,
    nickname,
    profileImageUrl: `https://cdn.example.com/profiles/${nextUserId}.png`,
  };

  nextUserId += 1;
  users.push(user);
  favoritesByUserId.set(user.id, new Set());

  return clone(user);
}

export function updateUserProfile(userId, changes) {
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return null;
  }

  if (changes.name !== undefined) {
    user.name = changes.name;
  }

  if (changes.nickname !== undefined) {
    user.nickname = changes.nickname;
  }

  return clone(user);
}

export function hasEmailConflict(email, exceptUserId) {
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase() && user.id !== exceptUserId);
}

export function hasNicknameConflict(nickname, exceptUserId) {
  return users.some((user) => user.nickname.toLowerCase() === nickname.toLowerCase() && user.id !== exceptUserId);
}

export function listMarketImages({ page, size, sort }) {
  const ordered = sortedImages(sort);

  if (!ordered) {
    return null;
  }

  return clone(paginate(ordered, { page, size }).map(imageSummary));
}

export function searchMarketImages({ keyword, category, page, size }) {
  const normalizedKeyword = keyword ? keyword.toLowerCase() : null;
  const normalizedCategory = category ? category.toUpperCase() : null;

  const filtered = images.filter((image) => {
    const keywordMatched =
      !normalizedKeyword ||
      image.title.toLowerCase().includes(normalizedKeyword) ||
      image.description.toLowerCase().includes(normalizedKeyword);

    const categoryMatched = !normalizedCategory || image.category === normalizedCategory;

    return keywordMatched && categoryMatched;
  });

  return clone(
    paginate(
      filtered.sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt)),
      { page, size },
    ).map(favoriteSummary),
  );
}

export function getImageById(imageId) {
  return clone(findImageInternal(imageId));
}

export function getImageDetail(imageId, currentUserId) {
  const image = findImageInternal(imageId);
  return image ? clone(detailPayload(image, currentUserId)) : null;
}

export function getImageVerification(imageId) {
  const image = findImageInternal(imageId);
  return image ? clone(verificationPayload(image)) : null;
}

export function listMyImages(userId, { page, size }) {
  const items = images
    .filter((image) => image.sellerId === userId)
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

  return clone(paginate(items, { page, size }).map(myImageSummary));
}

export function listFavoriteImages(userId, { page, size }) {
  const favoriteIds = favoritesByUserId.get(userId) || new Set();
  const items = images
    .filter((image) => favoriteIds.has(image.id))
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));

  return clone(paginate(items, { page, size }).map(favoriteSummary));
}

export function addFavorite(userId, imageId) {
  const favorites = favoritesByUserId.get(userId) || new Set();
  favorites.add(imageId);
  favoritesByUserId.set(userId, favorites);

  return {
    imageId,
    favorited: true,
  };
}

export function isFavorite(userId, imageId) {
  const favorites = favoritesByUserId.get(userId) || new Set();
  return favorites.has(imageId);
}

export function removeFavorite(userId, imageId) {
  const favorites = favoritesByUserId.get(userId) || new Set();
  const removed = favorites.delete(imageId);
  favoritesByUserId.set(userId, favorites);
  return removed;
}

export function createImage({
  sellerId,
  title,
  description,
  price,
  category,
  deviceId,
  capturedAt,
  originalFilename,
}) {
  const createdAt = capturedAt || new Date().toISOString();
  const imageId = nextImageId;
  const hashSeed = `${imageId}:${sellerId}:${title}:${originalFilename}:${createdAt}`;
  const record = {
    id: imageId,
    title,
    description: description || "",
    imageUrl: `https://cdn.example.com/images/${imageId}-original.jpg`,
    thumbnailUrl: `https://cdn.example.com/images/${imageId}-thumb.jpg`,
    price,
    category,
    sellerId,
    verificationStatus: "VERIFIED",
    imageHash: hashValue(hashSeed),
    txHash: hashValue(`tx:${hashSeed}`),
    blockNumber: 200 + imageId,
    contractAddress: "0x9876543210abcdef",
    deviceId: deviceId || null,
    createdAt,
    isSold: false,
  };

  nextImageId += 1;
  images.push(record);

  return clone({
    id: record.id,
    title: record.title,
    imageUrl: record.imageUrl,
    thumbnailUrl: record.thumbnailUrl,
    price: record.price,
    imageHash: record.imageHash,
    verificationStatus: record.verificationStatus,
    txHash: record.txHash,
    createdAt: record.createdAt,
  });
}

export function deleteImage(imageId) {
  const index = images.findIndex((image) => image.id === imageId);

  if (index === -1) {
    return false;
  }

  images.splice(index, 1);

  favoritesByUserId.forEach((favorites) => {
    favorites.delete(imageId);
  });

  return true;
}

export function createOrder(userId, { imageId, paymentMethod }) {
  const image = findImageInternal(imageId);

  if (!image) {
    return null;
  }

  const order = {
    orderId: nextOrderId,
    userId,
    imageId,
    price: image.price,
    paymentMethod,
    orderStatus: "PAID",
    purchasedAt: new Date().toISOString(),
  };

  nextOrderId += 1;
  orders.push(order);
  image.isSold = true;

  return clone({
    orderId: order.orderId,
    imageId: order.imageId,
    price: order.price,
    orderStatus: order.orderStatus,
    purchasedAt: order.purchasedAt,
  });
}

export function listOrders(userId, { page, size }) {
  const items = orders
    .filter((order) => order.userId === userId)
    .sort((left, right) => new Date(right.purchasedAt) - new Date(left.purchasedAt));

  return clone(paginate(items, { page, size }).map(orderSummary));
}

export function getOrder(orderId) {
  return clone(findOrderInternal(orderId));
}

export function buildDownloadResponse({ imageId, orderId, userId }) {
  const image = findImageInternal(imageId);
  const user = users.find((item) => item.id === userId);
  const order = findOrderInternal(orderId);

  if (!image || !user || !order) {
    return null;
  }

  return {
    downloadUrl: `https://cdn.example.com/downloads/${imageId}-watermarked-${userId}.jpg`,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    watermark: {
      applied: true,
      text: `Purchased by ${user.nickname}`,
      position: "bottom-right",
    },
  };
}

export function checkUploadedImage(file) {
  const image = findImageInternal(101) || images[0];
  const originalName = (file?.originalname || "").toLowerCase();

  if (originalName.includes("match") || originalName.includes("hangang") || originalName.includes("101")) {
    return clone({
      isVerified: true,
      verificationStatus: "MATCHED",
      imageId: image.id,
      imageHash: image.imageHash,
      txHash: image.txHash,
    });
  }

  return {
    isVerified: false,
    verificationStatus: "NOT_MATCHED",
    imageHash: hashValue(file?.buffer || Buffer.from(originalName || "unmatched")),
    reason: "The uploaded image hash does not match any registered blockchain record.",
  };
}
