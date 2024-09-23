import { Database } from "bun:sqlite";

export const db = new Database("./src/db/0000_Spok_DB.db", { create: true });
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        created_on DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);
// CREATE UNIQUE INDEX idx_users_username ON users(username);
// CREATE UNIQUE INDEX idx_users_email ON users(email);
// CREATE INDEX idx_users_created_on ON users(created_on);
