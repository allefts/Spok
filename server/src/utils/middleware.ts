import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { userSignedIn } from "./auth";

export const protect = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET!,
    cookie: "auth",
    alg: "HS256",
  });

  return jwtMiddleware(c, next);
});

export const checkSignedIn = createMiddleware(async (c, next) => {
  const signedIn = await userSignedIn(c);
  if (signedIn) {
    return;
  }
  return await next();
});
