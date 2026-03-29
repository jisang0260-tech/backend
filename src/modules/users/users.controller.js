import { createHttpError } from "../../utils/createHttpError.js";

const users = [
  {
    id: "u1",
    name: "Ada Lovelace",
    email: "ada@example.com",
  },
];

export async function listUsers(_req, res) {
  res.status(200).json({ data: users });
}

export async function getUserById(req, res) {
  const user = users.find((item) => item.id === req.params.userId);

  if (!user) {
    throw createHttpError(404, "User not found");
  }

  res.status(200).json({ data: user });
}

export async function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    throw createHttpError(400, "name and email are required");
  }

  const newUser = {
    id: `u${users.length + 1}`,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({ data: newUser });
}
