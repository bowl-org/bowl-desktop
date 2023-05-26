import queryRunner from "./commons/queryRunner";

const tableName = "contact_conversations";
const insertContactConversation = async (contactConversationData) => {
  const contatConversationId = queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, contactPersonId, isFavorite) VALUES (@userId, @contactPersonId, @isFavorite)`,
    contactConversationData
  ).lastInsertRowid;

  return await findContactConversation(contatConversationId);
};
const updateContactConversation = async (contactConversationData) => {
  queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET isFavorite = @isFavorite WHERE id = @id`,
    contactConversationData
  );
  return await findContactConversation(contactConversationData.id);
};
const deleteContactConversation = async (id) => {
  return queryRunner.deleteById(tableName, id);
};
const findContactConversation = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getContactConversationsByUserId = async (userId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE userId = ?`,
    userId
  );
};
const getContactConversationByContactPersonId = async (userId, contactPersonId) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE userId = ? AND contactPersonId = ?`,
    [ userId, contactPersonId ]
  );
};
export default {
  tableName,
  insertContactConversation,
  updateContactConversation,
  deleteContactConversation,
  findContactConversation,
  getContactConversationsByUserId,
  getContactConversationByContactPersonId,
};
