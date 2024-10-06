import { Hono } from "hono";
import { getAllLogs, getMostRecentLog } from "../controllers/logs";
import { getUserFromCookie } from "../utils/auth";

const logRoutes = new Hono();

/*
  GET /logs => html for logs page
*/

logRoutes.get("/logs", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();

  const logs = getAllLogs(id);

  if (logs.length === 0) {
    return c.html(`<h5 class="no_logs_message">GO DO STUFF!</h5>`);
  }

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

logRoutes.get("/sidebarlogs", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();

  const logs = getAllLogs(id);

  if (logs.length === 0) {
    return c.html(`<h5 class="no_logs_message">GO DO STUFF!</h5>`);
  }

  const logCards = logs.map((log) => {
    return `
    <div class="sidebar_log_card">
      <p class="sidebar_log_action">
        ${log.action.icon}
        ${log.action.name}
      </p>
      <p class="log_timestamp">
        ${new Date(log.timestamp).toLocaleTimeString()}
      </p>
    </div>
    `;
  });

  return c.html(`${logCards.map((card) => card).join("")}`);
});

logRoutes.get("/recentlog", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();
  const log = getMostRecentLog(id)[0];

  return c.html(`
    <div class="sidebar_log_card">
      <p class="sidebar_log_action">${log.action.icon} ${log.action.name}</p>
      <p class="log_timestamp">
        ${new Date(log.timestamp).toLocaleTimeString()}
      </p>
    </div>
  `);
});

export default logRoutes;
