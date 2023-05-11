import db from "./commons/db";
import queryRunner from "./commons/queryRunner";

const tableName = "hash_tables";
const insertHashTable = async (hashTableData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName} (previousHashId, previousHashValue, hashMessageData, hashValue) VALUES (@previousHashId, @previousHashValue, @hashMessageData, @hashValue)`,
    hashTableData
  );
};
const updateHashTable = async (hashTableData) => {
  return queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET previousHashId = @previousHashId, previousHashValue = @previousHashValue, hashMessageData = @hashMessageData, hashValue = @hashValue WHERE id = @id`,
    hashTableData
  );
};
const deleteHashTable = async (id) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, id);
  });
};
const findHashTable = async (id) => {
  return queryRunner.findById(tableName, id);
};

export default {
  insertHashTable,
  updateHashTable,
  deleteHashTable,
  findHashTable,
};
