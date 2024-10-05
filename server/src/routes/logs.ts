import { Hono } from "hono";
import { getAllLogs } from "../controllers/logs";
import { getUserFromCookie } from "../utils/auth";

const logRoutes = new Hono();

/*
  GET /logs => html for logs page
*/

logRoutes.get("/logs", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();

  const logs = getAllLogs(id);

  const logCards = logs.map((log) => {
    return `
    <div class="log_card">
      <p class="log_action">
        ${log.action.icon}
        ${log.action.name}
      </p>
      <p class="log_timestamp">
        ${new Date(log.timestamp).toLocaleDateString()}
        ${new Date(log.timestamp).toLocaleTimeString()}
      </p>
    </div>
    `;
  });

  return c.html(
    `<div class="logs_content">
      ${logCards.map((card) => card).join("")}
    </div>`
  );
});

export default logRoutes;
