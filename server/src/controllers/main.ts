import type { ACTION } from "../types";
import { db } from "../db/db";

export const doAction = (action: ACTION, userId: number) => {
  try {
    //Creates Log
    db.prepare("INSERT INTO logs (user_id, action) VALUES (?, ?);").run(
      userId,
      action
    );

    db.prepare(
      "UPDATE users SET actions_left = actions_left - 1, actions_completed = actions_completed + 1 WHERE id = ?;"
    ).run(userId);
  } catch (err) {
    console.log(err);
    console.log("Could not do action");
  }
};

export const getRemainingActions = (userId: number) => {
  try {
    const actionsLeft = Object.values(
      db.prepare("SELECT actions_left FROM users WHERE id = ?;").get(userId)!
    )[0] as number;

    return actionsLeft;
  } catch (err) {
    console.log(err);
    console.log("Could not get remaining actions");
  }
};
