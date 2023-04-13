import db from "../commons/db.js";
const runQuery = (query) => {
    return db.exec(query);
}
//Returns info
const runPreparedQuery = (query, data) => {
  return db.prepare(query).run(data);
}
const getFromPreparedQuery = (query, data) => {
  return db.prepare(query).get(data);
}
const allFromPreparedQuery = (query, data) => {
  return db.prepare(query).all(data);
}
const findById = (tableName, id) => {
  return getFromPreparedQuery(`SELECT * FROM ${tableName} WHERE id = ${id}`);
}
const deleteById = (tableName, id) => {
  return runPreparedQuery(`DELETE FROM ${tableName} WHERE id = ${id}`);
}
const getAll = (tableName) => {
  return allFromPreparedQuery(`SELECT * FROM ${tableName}`);
}
export default {
  runQuery,
  runPreparedQuery,
  getFromPreparedQuery,
  allFromPreparedQuery,
  findById,
  deleteById,
  getAll,
}
