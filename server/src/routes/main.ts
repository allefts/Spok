import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { getUserFromCookie } from "../utils/auth";

const mainRoutes = new Hono();

//Checks if user is signed in, default fetch route for frontend
mainRoutes.get("/checkauth", async (c) => {
  const authCookie = getCookie(c, "auth");
  if (authCookie) {
    const decodedPayload = await verify(authCookie, process.env.JWT_SECRET!);
    if (decodedPayload) {
      //Signed In
      const _user = await (await getUserFromCookie(c)).json();
      return c.redirect("/main");
    }
  }

  //Not Signed In
  return c.redirect("/signin");
});

mainRoutes.get("/main", async (c) => {
  return c.html(`
    <div class="actions">
      <div class="action_card">
        <h1>🛣️</h1>
        <h3>Walk</h3>
      </div>
      <div class="action_card">
        <h1>🏕️</h1>
        <h3>Rest</h3>
      </div>
      <div class="action_card">
        <h1>🍓</h1>
        <h3>Eat</h3>
      </div>
      <div class="action_card">
        <h1>💧</h1>
        <h3>Drink</h3>
      </div>
    </div>
  `);
});

export default mainRoutes;
