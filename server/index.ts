import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { HTTPException } from "hono/http-exception";
import type { APIResponse } from "./src/types.js";
import authRoutes from "./src/routes/auth.js";
import mainRoutes from "./src/routes/main.js";
import logRoutes from "./src/routes/logs.js";

export const app = new Hono();

app.use(logger());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/*", serveStatic({ root: "../client/dist" }));

//Adds auth routes like signin and register
app.route("/", authRoutes);
app.route("/", mainRoutes);
app.route("/", logRoutes);

//Wildcard routes
app.get("*", async (c) => {
  const html = await Bun.file("../client/dist/index.html").text();
  return c.html(html);
});

//Catches thrown errors
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      { message: err.message, success: false } as APIResponse,
      err.status
    );
  }

  console.log(err);
  //Other types of errors
  return c.json({ success: false, error: "An unexpected error occurred" }, 500);
});

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};
