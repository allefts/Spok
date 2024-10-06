import { db } from "../db/db";
import { parseLogs } from "../utils/formatting";

export const getAllLogs = (userId: number) => {
  const rawLogs = db
    .prepare("SELECT * FROM logs where user_id = ?;")
    .all(userId);

  const parsedLogs = parseLogs(rawLogs);

  return parsedLogs;
};

export const getMostRecentLog = (userId: number) => {
  const mostRecentLog = db
    .prepare("SELECT * FROM logs ORDER BY timestamp DESC LIMIT 1;")
    .all(userId);

  const parsedLog = parseLogs(mostRecentLog);

  return parsedLog;
};
