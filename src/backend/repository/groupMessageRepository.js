import db from "./commons/db";
import queryRunner from "./commons/queryRunner";

const tableName = "group_messages";
const insertGroupMessage = async (messageData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName} (senderPersonId, groupConversationId, hashTableId, message, messageType, date, time) VALUES (@sernderPersonId, @groupConversationId, @hashTableId, @message, @messageType, @date, @time)`,
    messageData
  );
};
const updateGroupMessage = async (messageData) => {
  return queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET senderPerson = @senderPersonId, groupConversationId = @groupConversationId, hashTableId = @hashTableId, message = @message, messageType = @messageType, date = @date, time = @time WHERE id = @id`,
    messageData
  );
};
const deleteGroupMessage = async (id) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, id);
  });
};
const findGroupMessage = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getGroupMessagesByGroupConversationId = async (groupConversationId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE groupConversationId = ?`,
    groupConversationId
  );
};

export default {
  insertGroupMessage,
  updateGroupMessage,
  deleteGroupMessage,
  findGroupMessage,
  getGroupMessagesByGroupConversationId,
};
