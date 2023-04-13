import queryRunner from "./commons/queryRunner";

const tableName = "persons";
const insertPerson = async (personData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(publicKey, name, email) VALUES (@publicKey, @name, @email)`,
    personData
  );
};
const updatePerson = async (personData) => {
  return queryRunner.runPreparedQuery(
    `UPDATE ${tableName} SET publicKey = @publicKey , name = @name, email = @email WHERE id = @id`,
    personData
  );
};
const deletePerson = async (personData) => {
  return queryRunner.deleteById(tableName, personData.id);
};
const findPerson = async (id) => {
  return queryRunner.findById(tableName, id);
};
const findPersonByEmail = async (email) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE email = ?`,
    email
  );
};
const getAllPersons = async () => {
  return queryRunner.getAll(tableName);
};
export default {
  tableName,
  insertPerson,
  updatePerson,
  deletePerson,
  findPerson,
  findPersonByEmail,
  getAllPersons,
};
