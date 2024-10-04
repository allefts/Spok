import { Hono } from "hono";
import { getAllLogs } from "../controllers/logs";
import { getUserFromCookie } from "../utils/auth";
import { actionToEmoji } from "../utils/formatting";

const logRoutes = new Hono();

logRoutes.get("/logs", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();

  const logs = getAllLogs(id);

  console.log(logs[0].timestamp);

  const logCards = logs.map((log) => {
    return `
    <div class="log_card">
      <p class="log_action">
        ${actionToEmoji(log.action)}
        ${log.action}
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
