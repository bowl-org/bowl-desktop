import queryRunner from "./commons/queryRunner";

const tableName = "auth_token"
const setToken = async (token) => {
  return queryRunner.runPreparedQuery(
    `REPLACE INTO ${tableName} (id, userId, data) VALUES (1, @userId, @data)`,
    token
  );
};
const getToken = async () => {
  return queryRunner.findById(tableName, 1);
};
const deleteToken = async () => {
  return queryRunner.deleteById(tableName, 1);
};

export default {
  getToken,
  setToken,
  deleteToken,
};
