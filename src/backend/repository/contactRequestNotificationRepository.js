import Database from "better-sqlite3";

const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS contact_request_notifications(id INTEGER PRIMARY KEY AUTOINCREMENT, publicKey TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE)"
  );
};
//Default db
const insertContactRequestNotification = async (notificationData) => {
  const statement = db.prepare(
    "INSERT INTO contact_request_notifications(publicKey, name, email) VALUES (@publicKey, @name, @email)"
  );
  return statement.run(notificationData);
};
const deleteContactRequestNotification = async (id) => {
  const statement = db.prepare(
    "DELETE FROM contact_request_notifications WHERE id = ?"
  );
  return statement.run(id);
};
const findContactRequestNotificationById = async (id) => {
  const statement = db.prepare(
    "SELECT * FROM contact_request_notifications WHERE id = ?"
  );
  return statement.get(id);
};
const findContactRequestNotificationByEmail = async (email) => {
  const statement = db.prepare(
    "SELECT * FROM contact_request_notifications WHERE email = ?"
  );
  return statement.get(email);
};
const getAllContactRequestNotifications = async () => {
  return db.prepare("SELECT * FROM contact_request_notifications").all();
};
initDb();
export default {
  insertContactRequestNotification,
  deleteContactRequestNotification,
  findContactRequestNotificationById,
  findContactRequestNotificationByEmail,
  getAllContactRequestNotifications,
};
