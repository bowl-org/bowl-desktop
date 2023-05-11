import db from "./commons/db";
import queryRunner from "./commons/queryRunner";

const tableName = "group_conversations";
const insertGroupConversation = async (groupConversationData) => {
  const groupConversationId = queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, adminId, groupKey, name, description, isFavorite) VALUES (@userId, @adminId, @groupKey, @name, @description, @isFavorite)`,
    groupConversationData
  );
  return await findGroupConversation(groupConversationId);
};
const updateGroupConversation = async (groupConversationData) => {
  queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET adminId = @adminId, groupKey = @groupKey, name = @name, description = @description, isFavorite = @isFavorite WHERE id = @id`,
    groupConversationData
  );
  return await findGroupConversation(groupConversationData.id);
};
const deleteGroupConversation = async (id) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, id);
  });
};
const findGroupConversation = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getGroupConversationsByUserId = async (userId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE userId = ?`,
    userId
  );
};
export default {
  tableName,
  insertGroupConversation,
  updateGroupConversation,
  deleteGroupConversation,
  findGroupConversation,
  getGroupConversationsByUserId,
};
