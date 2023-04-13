import queryRunner from "../commons/queryRunner.js";
const up = () => {
  initAuthToken();
  initContactRequestNotifications();
  initGroupRequestNotifications();

  initPersons();
  initUsers();
  initContacts();
  initMessages();
  initConversations();
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
const initContacts = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS contacts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    personId INTEGER NOT NULL UNIQUE,
    FOREIGN KEY(personId) REFERENCES persons(id))`
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
const initMessages = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS messages(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      personId INTEGER NOT NULL,
      message TEXT NOT NULL,
      messageType TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      FOREIGN KEY(personId) REFERENCES persons(id))`
  );
const initConversations = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS conversations(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      isFavorite INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY(userId) REFERENCES users(id))`
  );
const initContactConversations = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS contact_conversations(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversationId INTEGER NOT NULL UNIQUE,
      contactId INTEGER NOT NULL UNIQUE,
      FOREIGN KEY(conversationId) REFERENCES conversations(id),
      FOREIGN KEY(contactId) REFERENCES contacts(id))`
  );
const initHashTables = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS hash_tables(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      previousHashId INTEGER NOT NULL UNIQUE DEFAULT 0,
      conversationId INTEGER NOT NULL,
      messageId INTEGER NOT NULL UNIQUE,
      previousHashValue TEXT NOT NULL,
      hashMessageData TEXT NOT NULL,
      hashValue TEXT NOT NULL,
      FOREIGN KEY(previousHashId) REFERENCES hash_tables(id),
      FOREIGN KEY(conversationId) REFERENCES conversations(id),
      FOREIGN KEY(messageId) REFERENCES messages(id))`
  );
const initGroupConversations = () =>
  queryRunner.runQuery(
    `CREATE TABLE IF NOT EXISTS group_conversations(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversationId INTEGER NOT NULL UNIQUE,
      adminId INTEGER NOT NULL,
      groupKey TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      FOREIGN KEY(conversationId) REFERENCES conversations(id),
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
