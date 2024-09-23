import { Hono } from "hono";

const mainRoutes = new Hono();
mainRoutes.get("/main", async (c) => {
  return c.html(`
    <div>
      <h1>Hello</h1>
      <h3>Main</h3>
    </div>
  `);
});

export default mainRoutes;
