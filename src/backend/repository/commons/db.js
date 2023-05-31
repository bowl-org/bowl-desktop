import Database from "better-sqlite3";

export let db;
// "./src/backend/db/bowl-chat.db"
export const initDbConnection = (dbPath) => {
  db = new Database(dbPath, { verbose: console.log });
  db.pragma("journal_mode = WAL");
};

// export default { db, initDbConnection };
