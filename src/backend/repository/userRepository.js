import db from "./commons/db";
import queryRunner from "./commons/queryRunner";
import personRepository from "./personRepository";
import user from "../models/user";

const tableName = "users";
const insertUser = async (userData) => {
  const person = await personRepository.insertPerson(user.toPerson(userData));
  const userId = queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName} (personId, privateKey) VALUES (?, ?)`,
    [person.id, userData.privateKey]
  ).lastInsertRowid;
  return await findUser(userId);
};
const updateUser = async (userData) => {
  db.transaction(async () => {
    queryRunner.runPreparedQuery(
      `UPDATE ${tableName} SET privateKey = @privateKey WHERE id = @id`,
      userData
    );
    let personData = user.toPerson(userData);
    await personRepository.updatePerson(personData);
  });
};
const deleteUser = async (id) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, id);
  });
};
const findUser = async (id) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT
      user.id,
      user.personId,
      user.privateKey,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} user
    INNER JOIN
      ${personRepository.tableName} person on user.personId = person.id
    WHERE user.id = ?`,
    id
  );
};
const findUserByPersonId = async (personId) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT
      user.id,
      user.personId,
      user.privateKey,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} user
    INNER JOIN
      ${personRepository.tableName} person on user.personId = person.id
    WHERE user.personId = ?`,
    personId
  );
};
const findUserByEmail = async (email) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT
      user.id,
      user.personId,
      user.privateKey,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} user
    INNER JOIN
      ${personRepository.tableName} person on user.personId = person.id
    WHERE person.email = ?`,
    email
  );
};
const getAllUsers = async () => {
  return queryRunner.allFromPreparedQuery(
    `SELECT
      user.id,
      user.personId,
      user.privateKey,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} user
    INNER JOIN
      ${personRepository.tableName} person on user.personId = person.id`
  );
};
export default {
  tableName,
  insertUser,
  updateUser,
  deleteUser,
  findUser,
  findUserByPersonId,
  findUserByEmail,
  getAllUsers,
};
