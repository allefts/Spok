import type { RegisterUser, User } from "../types.ts";
import { db } from "../db/db.ts";

export const userAlreadyExists = (email: string, username: string) => {
  try {
    return db.query(`SELECT 1 FROM users WHERE username = ? OR email = ?;`).get(username, email) ? true : false;
  } catch (err) {
    console.log("Unable to check if user already exists");
    return true;
  }
};

export const createUser = (user: RegisterUser) => {
  try {
    db.prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?);").run(
      user.username,
      user.email,
      user.password
    );
  } catch (err) {
    console.log("Could not insert user into database");
  }
};

export const getUserByEmail = (email: string) => {
  const user = db.query(`SELECT id, username, email, created_on FROM users WHERE email = ?;`).get(email) as User;
  return user;
};

export const getUserPassword = (email: string) =>
  db.query("SELECT password FROM users WHERE email = ?;").get(email) as { password: string };
