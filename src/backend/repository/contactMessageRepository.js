import queryRunner from "./commons/queryRunner";
import hashTableRepository from "./hashTableRepository";

const tableName = "contact_messages";
const insertContactMessage = async (messageData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName} (contactConversationId, hashTableId, isSenderUser, message, messageType, date, time) VALUES (@contactConversationId, @hashTableId, @isSenderUser, @message, @messageType, @date, @time)`,
    messageData
  );
};
const getMessagesByContactConversationId = async (contactConversationId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE contactConversationId = ?`,
    contactConversationId
  );
};

const updateContactMessage = async (messageData) => {
  return queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET contactConversationId = @contactConversationId, hashTableId = @hashTableId, isSenderUser = @isSenderUser, message = @message, messageType = @messageType, date = @date, time = @time WHERE id = @id`,
    messageData
  );
};
const deleteContactMessage = async (id) => {
  return queryRunner.deleteById(tableName, id);
};
const findContactMessage = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getContactMessagesByContactConversationId = async (
  contactConversationId
) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE contactConversationId = ?`,
    contactConversationId
  );
};

const getLastContactMessageByContactConversationId = async (
  contactConversationId
) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE contactConversationId = ? ORDER BY id DESC LIMIT 1`,
    contactConversationId
  );
};
const getHashTablesByContactConversationId = async (contactConversationId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT
      hash_table.id,
      hash_table.previousHashId,
      hash_table.previousHashValue,
      hash_table.hashMessageData,
      hash_table.hashValue,
    FROM
      ${tableName} contact_message
    INNER JOIN
      ${hashTableRepository.tableName} hash_table on contact_message.hashTableId = hash_table.id
    WHERE contact_message.conversationId = ?`,
    contactConversationId
  );
};
const getMessageCountByContactConversationId = async(contactConversationId) => {
  return queryRunner.getCountWhere(tableName, "contactConversationId = ?", contactConversationId);
}

export default {
  insertContactMessage,
  updateContactMessage,
  deleteContactMessage,
  findContactMessage,
  getMessagesByContactConversationId,
  getContactMessagesByContactConversationId,
  getLastContactMessageByContactConversationId,
  getHashTablesByContactConversationId,
  getMessageCountByContactConversationId,
};
