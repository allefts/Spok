import { Hono } from "hono";
import {
  deleteLog,
  getAllLogs,
  getLogsByDate,
  getMostRecentLog,
} from "../controllers/logs";
import { getUserFromCookie } from "../utils/auth";
import { HTTPException } from "hono/http-exception";

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
    <div class="log_card" data-id=${log.id}>
      <p class="log_action">
        ${log.action.icon}
        ${log.action.name}
      </p>
      <p class="log_timestamp">
        ${new Date(log.timestamp).toLocaleDateString()}
        ${new Date(log.timestamp).toLocaleTimeString()}
      </p>
      <span class="delete_log_btn">✖️</span>
    </div>
    `;
  });

  return c.html(
    `<div class="logs_content">
        <div class="logs_controls"> 
          <span class="logs_yesterday">👈 Yesterday</span>
          <h1 class="logs_date">${new Date().toLocaleDateString("en", {
            timeZone: "UTC",
          })}</h1>
        </div>
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
      <p class="sidebar_log_timestamp">
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

logRoutes.get("/logs/:day", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();
  //Yesterday
  const logsDate = c.req.param("day");
  // Today
  // const logsDate = new Date().toISOString().split("T")[0];

  const yesterdaysLogs = getLogsByDate(id, logsDate);

  if (yesterdaysLogs.length === 0) {
  }

  const logCards = yesterdaysLogs.map((log) => {
    return `
    <div class="log_card" data-id=${log.id}>
      <p class="log_action">
        ${log.action.icon}
        ${log.action.name}
      </p>
      <p class="log_timestamp">
        ${new Date(log.timestamp).toLocaleDateString()}
        ${new Date(log.timestamp).toLocaleTimeString()}
      </p>
      <span class="delete_log_btn">✖️</span>
    </div>
    `;
  });

  return c.json({
    success: true,
    html: `<div class="logs_content">
      <div class="logs_controls">
        <h1 class="logs_date">${new Date(logsDate).toLocaleDateString("en", {
          timeZone: "UTC",
        })}</h1>
        <span class="logs_today_btn">Today 👉</span>
      </div>
      ${logCards.map((card) => card).join("")}
    </div>`,
  });
});

logRoutes.delete("/log", async (c) => {
  const { id } = await (await getUserFromCookie(c)).json();
  const { logId } = await c.req.json();

  const deleted = deleteLog(id, parseInt(logId));

  if (deleted) {
    return c.text("Log Deleted");
  } else {
    throw new HTTPException(401, { message: "Unable to delete log" });
  }
});

export default logRoutes;
