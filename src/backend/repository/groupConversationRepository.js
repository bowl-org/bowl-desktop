import queryRunner from "./commons/queryRunner";

const tableName = "group_conversations";
const insertGroupConversation = async (groupConversationData) => {
  console.log("Insert group conversation:", groupConversationData);
  const groupConversationId = queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, groupId, groupKey, name, description, isFavorite) VALUES (@userId, @groupId, @groupKey, @name, @description, @isFavorite)`,
    groupConversationData
  ).lastInsertRowid;
  return await findGroupConversationById(groupConversationId);
};
const updateGroupConversation = async (groupConversationData) => {
  queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET groupKey = @groupKey, groupId = @groupId, name = @name, description = @description, isFavorite = @isFavorite WHERE id = @id`,
    groupConversationData
  );
  return await findGroupConversationById(groupConversationData.id);
};
const setFavoriteOfGroupConversation = async (groupConversationData) => {
  queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET isFavorite = @isFavorite WHERE id = @id`,
    groupConversationData
  );
  return await findGroupConversationById(groupConversationData.id);
};
const deleteGroupConversation = async (id) => {
    return queryRunner.deleteById(tableName, id);
};
const findGroupConversationById = async (id) => {
  return queryRunner.findById(tableName, id);
};
const findGroupConversationByGroupIdOfUser = async (groupData) => {
  return queryRunner.getFromPreparedQuery(`SELECT * FROM ${tableName} WHERE userId = @userId AND groupId = @groupId`, groupData);
};
const getGroupConversationsByUserId = async (userId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE userId = ?`,
    userId
  );
};
export default {
  tableName,
  findGroupConversationByGroupIdOfUser,
  insertGroupConversation,
  updateGroupConversation,
  deleteGroupConversation,
  findGroupConversationById,
  getGroupConversationsByUserId,
  setFavoriteOfGroupConversation
};
