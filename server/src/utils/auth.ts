import { Jwt } from "hono/utils/jwt";
import type { User } from "../types.ts";
import { getUserPassword } from "../controllers/auth.ts";
import { HTTPException } from "hono/http-exception";
import { getCookie } from "hono/cookie";
import type { Context } from "hono";

export const createJWT = async (user: User) => {
  return await Jwt.sign(
    {
      username: user.username,
      email: user.email,
      id: user.id,
      created_on: user.created_on,
    },
    process.env.JWT_SECRET!,
    "HS256"
  );
};

export const verifyPassword = async (tempPass: string, email: string) => {
  const { password } = getUserPassword(email);
  return await Bun.password.verify(tempPass, password);
};

export const getUserFromCookie = async (c: Context) => {
  const authCookie = getCookie(c, "auth");
  if (authCookie) {
    const { payload } = Jwt.decode(authCookie);
    return c.json(payload);
  } else {
    throw new HTTPException(401, { message: "Unable to get user" });
  }
};

export const userSignedIn = async (c: Context) => {
  const authCookie = getCookie(c, "auth");
  if (authCookie) {
    const { payload } = Jwt.decode(authCookie);
    if (payload) {
      return true;
    }
  }
  return false;
};
