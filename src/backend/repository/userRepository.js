import Database from 'better-sqlite3';

const db = new Database('./src/backend/db/main.db');
db.pragma('journal_mode = WAL');
//Default db
const insertUser = async (userData) => {
  console.log(userData);
};
const updateUser = async (userData) => {
  console.log(userData);
};
const deleteUser = async (userData) => {
  console.log(userData);
};
const findUser = async (userData) => {
  console.log(userData);
};
export default { insertUser, updateUser, deleteUser, findUser };
