import type { Action, Log } from "../types";

export const parseLogs = (logs: any[]) => {
  const parsedLogs = logs.map((log) => {
    const { icon, name } = parseAction(log.action);
    return {
      action: { icon, name },
      id: log.id,
      timestamp: log.timestamp,
      user_id: log.user_id,
    } as Log;
  });

  return parsedLogs;
};

export const parseAction = (action: string) => {
  const parsedAction = action.split(" ");
  const icon = parsedAction[0];
  const name = parsedAction.slice(1).join(" ");
  return { icon, name } as Action;
};

export const toSQLiteDate = (date: string) => {
  //MM/DD/YYYY -> YYYY-MM-DD
  console.log(date);
  let [m, d, y] = date.split("/");
  console.log(m, d, y);
  if (d.length === 1) {
    d = "0" + d;
  }

  if (m.length === 1) {
    m = "0" + m;
  }

  return [y, m, d].join("-");
};
