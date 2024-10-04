import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { getUserFromCookie } from "../utils/auth";
import { HTTPException } from "hono/http-exception";
import { ACTION, toACTION } from "../types";
import { doAction, getRemainingActions } from "../controllers/main";

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

//Returns HTML for main page
mainRoutes.get("/main", async (c) => {
  return c.html(`
    <div>
      <h4>Actions left today: </h4>
      <div class="actions">
        <div class="action_card" data-action="walk">
          <h1>🛣️</h1>
          <h3>Walk</h3>
        </div>
        <div class="action_card" data-action="rest">
          <h1>🏕️</h1>
          <h3>Rest</h3>
        </div>
        <div class="action_card" data-action="eat">
          <h1>🍓</h1>
          <h3>Eat</h3>
        </div>
        <div class="action_card" data-action="drink">
          <h1>💧</h1>
          <h3>Drink</h3>
        </div>
      </div>
    </div>
  `);
});

//Endpoint for completing an action
mainRoutes.post("/main", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();
  const userAction = toACTION(await c.req.text());

  if (!userAction) {
    throw new HTTPException(401, { message: "Unable to complete action" });
  }

  const actionsLeft = getRemainingActions(id);
  if (actionsLeft === 0) {
    throw new HTTPException(401, { message: "No actions left!" });
  }

  doAction(userAction, id);

  return c.json({ sucess: "action done" });
});

export default mainRoutes;
