import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "PRIME_BOSS";

export function generateToken<T>(data: T) {
  return jwt.sign({ sub: data }, SECRET, { expiresIn: "24h" });
}
