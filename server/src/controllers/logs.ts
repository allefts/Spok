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

export const deleteLog = (userId: number, logId: number) => {
  try {
    db.prepare("DELETE FROM logs where user_id = ? AND id = ?;").run(
      userId,
      logId
    );
    return true;
  } catch (err) {
    console.log(err);
    console.log("Error deleting log");
    return false;
  }
};

export const getLogsByDate = (userId: number, date: string) => {
  try {
    const logsOnDate = db
      .prepare("SELECT * FROM logs WHERE date(timestamp) = ? AND user_id = ?")
      .all(date, userId);

    const parsedLogs = parseLogs(logsOnDate);
    return parsedLogs;
  } catch (err) {
    console.log(err);
    console.log("Unable to get logs by date");
  }
  return [];
};
