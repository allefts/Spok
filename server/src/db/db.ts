import { Database } from "bun:sqlite";

export const db = new Database("./src/db/0000_Spok_DB.db", { create: true });

const createUsersTable = db.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        actions_left INTEGER DEFAULT 4,
        actions_completed INTEGER DEFAULT 0,
        created_on DATETIME DEFAULT CURRENT_TIMESTAMP);`);

createUsersTable.run();

const createLogsTable = db.query(`
    CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id));`);

createLogsTable.run();

// CREATE UNIQUE INDEX idx_users_username ON users(username);
// CREATE UNIQUE INDEX idx_users_email ON users(email);
// CREATE INDEX idx_users_created_on ON users(created_on);
