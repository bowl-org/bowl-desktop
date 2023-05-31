import { db } from "./commons/db";
import queryRunner from "./commons/queryRunner";

const tableName = "person_groups";
const insertPersonGroup = async (personGroupData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(groupConversationId, personId, isAdmin) VALUES (@groupConversationId, @personId, @isAdmin)`,
    personGroupData
  );
};
const deletePersonGroup = async (id) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, id);
  });
};
const findPersonGroup = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getPersonGroupsByGroupConversationId = async (groupConversationId) => {
  return queryRunner.allFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE groupConversationId = ? `,
    groupConversationId
  );
};
export default {
  tableName,
  insertPersonGroup,
  deletePersonGroup,
  findPersonGroup,
  getPersonGroupsByGroupConversationId,
};
