import { db } from "../db/db";
import type { Action } from "../types";

export const doAction = (action: Action, userId: number) => {
  try {
    //Creates Log, saves the action as "<ICON> <NAME>"
    db.prepare("INSERT INTO logs (user_id, action) VALUES (?, ?);").run(
      userId,
      action.icon + " " + action.name
    );

    //Updates user logs
    db.prepare(
      "UPDATE users SET actions_completed = actions_completed + 1 WHERE id = ?;"
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
