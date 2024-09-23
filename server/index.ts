import { Hono } from "hono";
import { logger } from "hono/logger";
import authRoutes from "./src/routes/auth.js";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import type { APIResponse } from "./src/types.js";
import { getUserFromCookie } from "./src/utils/auth.js";

const app = new Hono();
app.use(logger());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/*", serveStatic({ root: "../client/dist" }));

//Adds auth routes like signin and register
app.route("/", authRoutes);

//Checks if user is signed in, default fetch route for frontend
app.get("/checkauth", async (c) => {
  const authCookie = getCookie(c, "auth");
  if (authCookie) {
    const decodedPayload = await verify(authCookie, process.env.JWT_SECRET!);
    if (decodedPayload) {
      //Signed In
      const user = (await getUserFromCookie(c)).json();
      return c.html("Signed In");
    }
  }
  //Not Signed In
  const signinPage = await app.request("/signin");
  return c.html(await signinPage.text());
});

app.get("*", async (c) => {
  const html = await Bun.file("../client/dist/index.html").text();
  return c.html(html);
});

//Catches thrown errors
app.onError((err, c) => {
  //Caught errors
  if (err instanceof HTTPException) {
    return c.json({ message: err.message, success: false } as APIResponse, err.status);
  }

  //Other types of errors
  return c.json({ success: false, error: "An unexpected error occurred" }, 500);
});

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
