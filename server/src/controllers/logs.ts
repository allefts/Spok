import { db } from "../db/db";
import type { Log } from "../types";

export const getAllLogs = (userId: number) => {
  const logs = db
    .prepare("SELECT * FROM logs where user_id = ?;")
    .all(userId) as Log[];

  return logs;
};
