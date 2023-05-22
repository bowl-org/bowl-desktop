import db from "./commons/db";
import queryRunner from "./commons/queryRunner";

const tableName = "group_conversations";
const insertGroupConversation = async (groupConversationData) => {
  console.log("Insert group conversation:", groupConversationData);
  const groupConversationId = queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, groupKey, name, description, isFavorite) VALUES (@userId, @groupKey, @name, @description, @isFavorite)`,
    groupConversationData
  ).lastInsertRowid;
  return await findGroupConversation(groupConversationId);
};
const updateGroupConversation = async (groupConversationData) => {
  queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET groupKey = @groupKey, name = @name, description = @description, isFavorite = @isFavorite WHERE id = @id`,
    groupConversationData
  );
  return await findGroupConversation(groupConversationData.id);
};
const setFavoriteOfGroupConversation = async (groupConversationData) => {
  queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET isFavorite = @isFavorite WHERE id = @id`,
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
  setFavoriteOfGroupConversation
};
