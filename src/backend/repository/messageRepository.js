import queryRunner from './commons/queryRunner';

const tableName = 'messages';
const insertMessage = async (messageData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName} (personId, message, messageType, date, time) VALUES (@personId, @message, @messageType, @date, @time)`,
    messageData
  );
};
const getMessagesByPersonId = async (personId) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE personId = ?`,
    personId
  );
};
const updateMessage = async (messageData) => {
  return queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET personId = @personId, message = @message, messageType = @messageType, date = @date, time = @time WHERE id = @id`,
    messageData
  );
};
const deleteMessage = async (messageData) => {
  return queryRunner.deleteById(tableName, messageData.id);
};
const findMessage = async (messageData) => {
  return queryRunner.findById(tableName, messageData.id);
};
const getAllMessages = async (conversationId) => {
  console.log('GET ALL CONVERSATION:', conversationId);
  //DEMO
  return queryRunner.getAll(tableName);
};

export default {
  insertMessage,
  updateMessage,
  deleteMessage,
  findMessage,
  getAllMessages,
  getMessagesByPersonId,
};
