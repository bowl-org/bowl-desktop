import Database from "better-sqlite3";
//import messageModel from '../models/message';
const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS authtoken(id INTEGER PRIMARY KEY, userId INTEGER NOT NULL, data TEXT NOT NULL)"
  );
};
//Default db
const setToken = async (token) => {
  const statement = db.prepare(
    "REPLACE INTO authtoken (id, userId, data) VALUES (1, @userId, @data)"
  );
  return statement.run(token);
};
const getToken = async () => {
  const statement = db.prepare("SELECT * FROM authtoken WHERE id = 1");
  return statement.get();
};
const deleteToken = async () => {
  const statement = db.prepare("DELETE FROM authtoken WHERE id = 1");
  return statement.run();
};

initDb();
export default {
  getToken,
  setToken,
  deleteToken
};
