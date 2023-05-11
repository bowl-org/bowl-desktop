import queryRunner from "../commons/queryRunner.js";
const up = () => {
  initAuthToken();
  initContactRequestNotifications();
  initGroupRequestNotifications();

  initPersons();
  initUsers();
  initGroupMessages();
  initGroupConversations();
  initContactMessages();
  initContactConversations();
  initGroupConversations();
  initPersonGroups();
  initHashTables();
};
const down = () => {
  throw new Error("Down not implemented yet!");
};
const initUsers = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personId INTEGER NOT NULL UNIQUE,
    privateKey TEXT NOT NULL,
    FOREIGN KEY(personId) REFERENCES persons(id))`
  );
const initPersons = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS persons(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    publicKey TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE)`
  );
const initAuthToken = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS auth_token(
    id INTEGER PRIMARY KEY,
    userId INTEGER NOT NULL UNIQUE,
    data TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id))`
  );
const initContactRequestNotifications = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS contact_request_notifications(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      publicKey TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      FOREIGN KEY(userId) REFERENCES users(id))`
  );
const initGroupRequestNotifications = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS group_request_notifications(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      key TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id))`
  );
const initContactMessages = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS contact_messages(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactConversationId INTEGER NOT NULL,
      hashTableId INTEGER NULL,
      isSenderUser INTEGER NOT NULL,
      message TEXT NOT NULL,
      messageType TEXT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      FOREIGN KEY(contactConversationId) REFERENCES contact_conversations(id),
      FOREIGN KEY(hashTableId) REFERENCES hash_tables(id))`
  );
const initGroupMessages = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS group_messages(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      senderPersonId INTEGER NOT NULL,
      groupConversationId INTEGER NOT NULL,
      hashTableId INTEGER NULL,
      message TEXT NOT NULL,
      messageType TEXT,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      FOREIGN KEY(senderPersonId) REFERENCES persons(id),
      FOREIGN KEY(hashTableId) REFERENCES hash_tables(id))`
  );
const initContactConversations = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS contact_conversations(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      contactPersonId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      isFavorite INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(contactPersonId) REFERENCES persons(id),
      FOREIGN KEY(userId) REFERENCES users(id))`
  );
const initHashTables = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS hash_tables(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      previousHashId INTEGER NOT NULL UNIQUE DEFAULT 0,
      conversationId INTEGER NOT NULL,
      previousHashValue TEXT NOT NULL,
      hashMessageData TEXT NOT NULL,
      hashValue TEXT NOT NULL,
      FOREIGN KEY(previousHashId) REFERENCES hash_tables(id),
      FOREIGN KEY(conversationId) REFERENCES conversations(id))`
  );
const initGroupConversations = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS group_conversations(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      adminId INTEGER NOT NULL,
      groupKey TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      isFavorite INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(adminId) REFERENCES persons(id))`
  );
const initPersonGroups = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS person_groups(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupConversationId INTEGER NOT NULL,
      personId INTEGER NOT NULL,
      FOREIGN KEY(groupConversationId) REFERENCES group_conversations(id),
      FOREIGN KEY(personId) REFERENCES persons(id))`
  );

export default {
  up,
  down,
};
