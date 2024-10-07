import { db } from "../db/db";
import { parseLogs, toSQLiteDate } from "../utils/formatting";

export const getAllLogs = (userId: number) => {
  const rawLogs = db
    .prepare(
      `SELECT * FROM logs where user_id = ? AND DATE(TIMESTAMP) = DATE("now", "localtime");`
    )
    .all(userId);

  // db.prepare(`UPDATE users SET actions_left = 5 WHERE id = ?`).run(userId);

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

    db.prepare(
      "UPDATE users SET actions_left = actions_left + 1, actions_completed = actions_completed - 1 WHERE id = ?;"
    ).run(userId);
    return true;
  } catch (err) {
    console.log(err);
    console.log("Error deleting log");
    return false;
  }
};

export const getLogsByDate = (userId: number, date: string) => {
  const formattedDate = toSQLiteDate(date);
  try {
    const logsOnDate = db
      .prepare(
        `SELECT * FROM logs WHERE DATE(timestamp) = DATE(?) AND user_id = ?`
      )
      .all(formattedDate, userId);

    const parsedLogs = parseLogs(logsOnDate);
    return parsedLogs;
  } catch (err) {
    console.log(err);
    console.log("Unable to get logs by date");
  }
  return [];
};
