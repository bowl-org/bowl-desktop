import Database from "better-sqlite3";
//import messageModel from '../models/message';
const db = new Database("./src/backend/db/main.db");
db.pragma("journal_mode = WAL");
const initDb = () => {
  db.exec(
    "CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT, messageType TEXT, date TEXT, time TEXT)"
  );
};
//Default db
const insertMessage = async (messageData) => {
  const statement = db.prepare(
    "INSERT INTO messages (message, messageType, date, time) VALUES (@message, @messageType, @date, @time)"
  );
   return statement.run(messageData);
};
const updateMessage = async (messageData) => {
  const statemnet = db.prepare(
    "UPDATE messages SET message = @message, messageType = @messageType, date = @date, time = @time WHERE id = @id"
  );
  return statemnet.run(messageData);
};
const deleteMessage = async (messageData) => {
  const statemnet = db.prepare("DELETE FROM messages WHERE id = ?");
  return statemnet.run(messageData.id);
};
const findMessage = async (messageData) => {
  const statemnet = db.prepare("SELECT * FROM messages WHERE id = ?");
  return statemnet.get(messageData.id);
};
const getAllMessages = async () => {
  return db.prepare("SELECT * FROM messages").all();
};

initDb();
export default {
  insertMessage,
  updateMessage,
  deleteMessage,
  findMessage,
  getAllMessages,
};
