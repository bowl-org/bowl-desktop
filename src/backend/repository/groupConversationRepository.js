import db from "./commons/db";
import queryRunner from "./commons/queryRunner";
import conversationRepository from "./conversationRepository";
import groupConversation from "../models/groupConversation";

const tableName = "group_conversations";
const insertGroupConversation = async (groupConversationData) => {
  db.transaction(async () => {
    const info = await conversationRepository.insertConversation(
      groupConversation.toConversation(groupConversationData)
    );
    return queryRunner.runPreparedQuery(
      `INSERT INTO ${tableName}(conversationId, adminId, groupKey, name, description) VALUES (?, ?, ?, ?, ?)`,
      [
        info.lastInsertRowid,
        groupConversationData.adminId,
        groupConversationData.groupKey,
        groupConversationData.name,
        groupConversationData.description,
      ]
    );
  });
};
const updateGroupConversation = async (groupConversationData) => {
  db.transaction(async () => {
    queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET adminId = @adminId, groupKey = @groupKey, name = @name, description = @description WHERE id = @id`,
    groupConversationData
    );
    let conversationData = groupConversation.toConversation(
      groupConversationData
    );
    await conversationRepository.updateConversation(conversationData);
  });
};
const deleteGroupConversation = async (groupConversationData) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, groupConversationData.id);
  });
};
const findGroupConversation = async (id) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT
      group_conversation.id,
      group_conversation.conversationId,
      group_conversation.adminId,
      group_conversation.groupKey,
      group_conversation.name,
      group_conversation.description,
      conversation.userId
      conversation.isFavorite
    FROM
      ${tableName} group_conversation
    INNER JOIN
      ${conversationRepository.tableName} conversation on group_conversation.conversationId = conversation.id
    WHERE group_conversation.id = ?`,
    id
  );
};
const getAllGroupConversations = async () => {
  return queryRunner.allFromPreparedQuery(
    `SELECT
      group_conversation.id,
      group_conversation.conversationId,
      group_conversation.adminId,
      group_conversation.groupKey,
      group_conversation.name,
      group_conversation.description,
      conversation.userId
      conversation.isFavorite
    FROM
      ${tableName} group_conversation
    INNER JOIN
      ${conversationRepository.tableName} conversation on group_conversation.conversationId = conversation.id`
  );
};
export default {
  tableName,
  insertGroupConversation,
  updateGroupConversation,
  deleteGroupConversation,
  findGroupConversation,
  getAllGroupConversations,
};
