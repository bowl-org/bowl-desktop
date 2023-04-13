import db from "./commons/db";
import queryRunner from "./commons/queryRunner";
import personRepository from "./personRepository";
import contact from "../models/contact";

const tableName = "contacts";
const insertContact = async (contactData) => {
  db.transaction(async () => {
    const info = await personRepository.insertPerson(
      contact.toPerson(contactData)
    );
    queryRunner.runPreparedQuery(
      `INSERT INTO ${tableName}(personId, privateKey) VALUES (?, ?)`,
      info.lastInsertRowid
    );
  });
};
const updateContact = async (contactData) => {
  db.transaction(async () => {
    //queryRunner.runPreparedQuery(
    //`UPDATE ${tableName} SET  WHERE id = @id`,
    //contactData
    //);
    let personData = contact.toPerson(contactData);
    await personRepository.updatePerson(personData);
  });
};
const deleteContact = async (contactData) => {
  db.transaction(() => {
    queryRunner.deleteById(tableName, contactData.id);
  });
};
const findContact = async (id) => {
  return queryRunner.runPreparedQuery(
    `SELECT
      contact.id,
      contact.personId,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} contact
    INNER JOIN
      ${personRepository.tableName} person on contact.personId = person.id
    WHERE contact.id = ?`,
    id
  );
};
const findContactByPersonId = async (personId) => {
  return queryRunner.runPreparedQuery(
    `SELECT
      contact.id,
      contact.personId,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} contact
    INNER JOIN
      ${personRepository.tableName} person on contact.personId = person.id
    WHERE contact.personId = ?`,
    personId
  );
};
const getAllContacts = async () => {
  return queryRunner.allFromPreparedQuery(
    `SELECT
      contact.id,
      contact.personId,
      person.publicKey,
      person.name,
      person.email
    FROM
      ${tableName} contact
    INNER JOIN
      ${personRepository.tableName} person on contact.personId = person.id`
  );
};
export default {
  tableName,
  insertContact,
  updateContact,
  deleteContact,
  findContact,
  findContactByPersonId,
  getAllContacts,
};
