import Database from "better-sqlite3";

const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, privateKey TEXT NOT NULL, publicKey TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)"
  );
};
//Default db
const insertUser = async (userData) => {
  const statement = db.prepare(
    "INSERT INTO users(privateKey, publicKey, name, email) VALUES (@privateKey, @publicKey, @name, @email)"
  );
  return statement.run(userData);
};
const updateUser = async (userData) => {
  const statement = db.prepare(
    "UPDATE users SET privateKey = @privateKey, publicKey = @publicKey , name = @name, email = @email WHERE id = @id"
  );
  return statement.run(userData);
};
const deleteUser = async (userData) => {
  const statement = db.prepare("DELETE FROM users WHERE id = @id");
  return statement.run(userData);
};
const findUser = async (id) => {
  const statement = db.prepare("SELECT * FROM users WHERE id = ?");
  return statement.get(id);
};
const findUserByEmail = async (email) => {
  const statement = db.prepare("SELECT * FROM users WHERE email = ?");
  return statement.get(email);
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
  findUserByEmail,
  getAllUsers,
};
