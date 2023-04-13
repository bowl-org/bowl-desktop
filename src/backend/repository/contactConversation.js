import db from "./commons/db";
import queryRunner from "./commons/queryRunner";
import conversationRepository from "./conversationRepository";
import contactConversation from "../models/contactConversation";

const tableName = "contact_conversations";
const insertContactConversation = async (contactConversationData) => {
  db.transaction(async () => {
    const info = await conversationRepository.insertConversation(
      contactConversation.toConversation(contactConversationData)
    );
    return queryRunner.runPreparedQuery(
      `INSERT INTO ${tableName}(conversationId, contactId) VALUES (?, ?)`,
      [info.lastInsertRowid, contactConversationData.contactId]
    );
  });
};
const updateContactConversation = async (contactConversationData) => {
  db.transaction(async () => {
    //queryRunner.runPreparedQuery(
    //`UPDATE ${tableName} SET conversation_id = @conversationId, contact_id = @contactId WHERE id = @id`,
    //contactConversationData
    //);
    let conversationData = contactConversation.toConversation(
      contactConversationData
    );
    await conversationRepository.updateConversation(conversationData);
  });
};
const deleteContactConversation = async (contactConversationData) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, contactConversationData.id);
  });
};
const findContactConversation = async (id) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT
      contact_conversation.id,
      contact_conversation.conversationId,
      contact_conversation.contactId,
      conversation.userId
      conversation.isFavorite
    FROM
      ${tableName} contact_conversation
    INNER JOIN
      ${conversationRepository.tableName} conversation on contact_conversation.conversationId = conversation.id
    WHERE contact_conversation.id = ?`,
    id
  );
};
const findContactConversationByContactId = async (contactId) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT
      contact_conversation.id,
      contact_conversation.conversationId,
      contact_conversation.contactId,
      conversation.userId
      conversation.isFavorite
    FROM
      ${tableName} contact_conversation
    INNER JOIN
      ${conversationRepository.tableName} conversation on contact_conversation.conversationId = conversation.id
    WHERE contact_conversation.contactId = ?`,
    contactId
  );
};
const getAllContactConversations = async () => {
  return queryRunner.allFromPreparedQuery(
    `SELECT
      contact_conversation.id,
      contact_conversation.conversationId,
      contact_conversation.contactId,
      conversation.userId
      conversation.isFavorite
    FROM
      ${tableName} contact_conversation
    INNER JOIN
      ${conversationRepository.tableName} conversation on contact_conversation.conversationId = conversation.id`
  );
};
export default {
  tableName,
  insertContactConversation,
  updateContactConversation,
  deleteContactConversation,
  findContactConversation,
  findContactConversationByContactId,
  getAllContactConversations,
};
