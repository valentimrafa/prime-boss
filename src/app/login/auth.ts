import jwt from "jsonwebtoken";
import { User } from "./users";

const SECRET = process.env.JWT_SECRET || "123";

export function generateToken(user: User) {
  return jwt.sign(
    { sub: user.id, name: user.name, username: user.username },
    SECRET,
    { expiresIn: "1h" }
  );
}
