import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { jwt } from "hono/jwt";
import { Jwt } from "hono/utils/jwt";

//Protects routes so that they can only be requested from HTMX
// export const htmxOnly = createMiddleware(async (c, next) => {
//   if (c.req.header("HX-Request")) {
//     await next();
//   } else {
//     return c.html("<h1>404 Not Found</h1>");
//   }
// });

export const protect = createMiddleware(async (c, next) => {
  const jwtMiddleware = jwt({
    secret: process.env.JWT_SECRET!,
    cookie: "auth",
    alg: "HS256",
  });

  return jwtMiddleware(c, next);
});
