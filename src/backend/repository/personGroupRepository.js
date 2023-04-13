import db from "./commons/db";
import queryRunner from "./commons/queryRunner";

const tableName = "person_groups";
const insertPersonGroup = async (personGroupData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(groupConversationId, personId) VALUES (@groupConversationId, @personId)`,
    personGroupData
  );
};
const deletePersonGroup = async (personGroupData) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, personGroupData.id);
  });
};
const findPersonGroup = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getAllPersonGroups = async () => {
  return queryRunner.getAll();
};
export default {
  tableName,
  insertPersonGroup,
  deletePersonGroup,
  findPersonGroup,
  getAllPersonGroups,
};
