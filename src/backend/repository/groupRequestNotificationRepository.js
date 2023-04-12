import Database from "better-sqlite3";

const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS group_request_notifications(id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL)"
  );
};
//Default db
const insertGroupRequestNotification = async (notificationData) => {
  const statement = db.prepare(
    "INSERT INTO group_request_notifications(key, name, description) VALUES (@key, @name, @description)"
  );
  return statement.run(notificationData);
};
const deleteGroupRequestNotification = async (id) => {
  const statement = db.prepare(
    "DELETE FROM group_request_notifications WHERE id = ?"
  );
  return statement.run(id);
};
const findGroupRequestNotificationById = async (id) => {
  const statement = db.prepare(
    "SELECT * FROM group_request_notifications WHERE id = ?"
  );
  return statement.get(id);
};
const getAllGroupRequestNotifications = async () => {
  return db.prepare("SELECT * FROM group_request_notifications").all();
};
initDb();
export default {
  insertGroupRequestNotification,
  deleteGroupRequestNotification,
  findGroupRequestNotificationById,
  getAllGroupRequestNotifications,
};
