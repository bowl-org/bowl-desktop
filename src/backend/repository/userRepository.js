import Database from "better-sqlite3";

const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, privateKey TEXT, publicKey TEXT, name TEXT)"
  );
};
//Default db
const insertUser = async (userData) => {
  const statement = db.prepare(
    "INSERT INTO users(privateKey, publicKey, name) VALUES (@privateKey, @publicKey, @name)"
  );
  return statement.run(userData);
};
const updateUser = async (userData) => {
  const statement = db.prepare(
    "UPDATE users SET privateKey = @privateKey, publicKey = @publicKey , name = @name WHERE id = @id"
  );
  return statement.run(userData);
};
const deleteUser = async (userData) => {
  const statement = db.prepare("DELETE FROM users WHERE id = @id");
  return statement.run(userData);
};
const findUser = async (userData) => {
  const statement = db.prepare("SELECT * FROM users WHERE id = @id");
  return statement.run(userData);
};
const getAllUsers = async () => {
  return db.prepare("SELECT * FROM users").all();
};
initDb();
export default {
  insertUser,
  updateUser,
  deleteUser,
  findUser,
  getAllUsers,
};
