import db from "./commons/db";
import queryRunner from "./commons/queryRunner";
import personRepository from "./personRepository";
import user from "../models/user";

const tableName = "users";
const insertUser = async (userData) => {
  db.transaction(async () => {
    const info = await personRepository.insertPerson(user.toPerson(userData));
    //const info = queryRunner.runPreparedQuery(
    //"INSERT INTO persons(public_key, name, email) VALUES (@publicKey, @name, @email)",
    //userData
    //);
    queryRunner.runPreparedQuery(
      `INSERT INTO ${tableName}(personId, privateKey) VALUES (?, ?)`,
      [info.lastInsertRowid, userData.privateKey]
    );
  });
};
const updateUser = async (userData) => {
  db.transaction(async () => {
    queryRunner.runPreparedQuery(
      `UPDATE ${tableName} SET privateKey = @privateKey WHERE id = @id`,
      userData
    );
    let personData = user.toPerson(userData);
    await personRepository.updatePerson(personData);
    //queryRunner.runPreparedQuery(
    //"UPDATE persons SET publicKey = @publicKey, name = @name, email = @email WHERE id = @personId",
    //{ ...userData, personId: info.lastInsertRowid }
    //);
  });
};
const deleteUser = async (userData) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, userData.id);
  });
};
const findUser = async (id) => {
  return queryRunner.runPreparedQuery(
    `SELECT
      user.id,
      user.personId
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
  return queryRunner.runPreparedQuery(
    `SELECT
      user.id,
      user.personId
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
      user.personId
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
      user.personId
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
