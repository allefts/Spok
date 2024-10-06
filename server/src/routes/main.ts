import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import { getUserFromCookie } from "../utils/auth";
import { HTTPException } from "hono/http-exception";
import { doAction, getRemainingActions } from "../controllers/main";
import { parseAction } from "../utils/formatting";
import { baseActions, type Action } from "../types";

const mainRoutes = new Hono();

/* 
  GET /checkauth => just checks if there is a user signed in or not
  GET /main => returns the html for the main page
  POST /main => endpoint for when user tries to complete an action
*/

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
    <div class="main_content">
      <div class="main">
        <h1 class="main_title" >What did you do today?</h1>
        <div class="main_input_content">
          <button class="random_emoji_btn" type="select">🤗</button>
          <input class="action_input" autofocus type="text" minlength="3" maxlength="85" />
        </div>
        <div class="actions">
          ${baseActions
            .map((action) => {
              return `
            <div class="action_card">
              <h3>${action.icon}</h3>
              <h5>${action.name}</h5>
            </div>
            `;
            })
            .join("")}
        </div>
      </div>
      <div class="sidebar">
        <h3 class="sidebar_title">Today:</h3>
        <div class="sidebar_contents"></div>
      </div>
    </div>
  `);
});

mainRoutes.post("/main", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();
  const rawAction = await c.req.text();
  if (!rawAction) {
    throw new HTTPException(401, { message: "Unable to complete action" });
  }

  const userAction: Action = parseAction(rawAction);

  const actionsLeft = getRemainingActions(id);
  if (actionsLeft === 0) {
    throw new HTTPException(401, { message: "No actions left!" });
  }

  doAction(userAction, id);

  return c.json({ sucess: "action done" });
});

export default mainRoutes;
