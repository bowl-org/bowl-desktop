import Database from "better-sqlite3";
//import messageModel from '../models/message';
const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS authtoken(id INTEGER PRIMARY KEY, data TEXT)"
  );
};
//Default db
const setToken = async (tokenData) => {
  const statement = db.prepare(
    "REPLACE INTO authtoken (id, data) VALUES (1, ?)"
  );
  return statement.run(tokenData);
};
const getToken = async () => {
  const statement = db.prepare("SELECT * FROM authtoken WHERE id = 1");
  return statement.get();
};

initDb();
export default {
  getToken,
  setToken,
};
