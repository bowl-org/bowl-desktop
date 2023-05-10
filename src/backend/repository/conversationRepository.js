import db from "./commons/db";
import queryRunner from "./commons/queryRunner";
//import conversation from "../models/conversation";

const tableName = "conversations";
const insertConversation = async (conversationData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, isFavorite) VALUES(@userId, @isFavorite)`,
    conversationData
  );
};
const updateConversation = async (conversationData) => {
  return queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET userId = @userId, isFavorite = @isFavorite WHERE id = @id`,
    conversationData
  );
};
const deleteConversation = async (conversationData) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, conversationData.id);
  });
};
const findConversation = async (id) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE id = ?`,
    id
  );
};
const findConversationsByUserId = async (userId) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE userId = ?`,
    userId
  );
};
const getAllConversation = async () => {
  return queryRunner.getAll(tableName);
};
export default {
  tableName,
  insertConversation,
  updateConversation,
  deleteConversation,
  findConversation,
  findConversationsByUserId,
  getAllConversation,
};
