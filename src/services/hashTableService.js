import hashTableRepo from "@/ipc-wrappers/hashTableRepositoryWrapper";
import HashTable from "@/backend/models/hashTable";
import cryptionService from "./cryptionService";

const insertHashTable = async (hashTableData) => {
  return hashTableRepo.insertHashTable(hashTableData);
};
const updateHashTable = async (hashTableData) => {
  return hashTableRepo.updateHashTable(hashTableData);
};
const deleteHashTable = async (id) => {
  return hashTableRepo.deleteHashTable(id);
};
const findHashTable = async (id) => {
  return hashTableRepo.findHashTable(id);
};
const createHashTable = async (prevHashId, message, publicKey) => {
  let hashTableData = await generateHashTable(prevHashId, message, publicKey);
  return await insertHashTable(hashTableData);
};
const generateHashTable = async (prevHashId, message, publicKey) => {
  let hashTable = HashTable.hashTableModel;
  hashTable.hashMessageData = await generateHashMessageData(message, publicKey);
  //If previous hash table exists
  console.log("prev hash id:", prevHashId);
  if (prevHashId != null && prevHashId != -1) {
    let prevHashTable = await findHashTable(prevHashId);
    hashTable.previousHashValue = prevHashTable.hashValue;
    hashTable.previousHashId = prevHashId;
  } else {
    hashTable.previousHashValue = "0";
    hashTable.previousHashId = -1;
  }

  hashTable.hashValue = await generateHashValue(
    hashTable.previousHashValue,
    hashTable.hashMessageData
  );

  return hashTable;
};
const generateHashMessageData = async (message, publicKey) => {
  return await cryptionService.generateHash(message + publicKey);
};
const generateHashValue = async (prevHashVal, hashMessageData) => {
  return await cryptionService.generateHash(prevHashVal + hashMessageData);
};
export default {
  createHashTable,
  updateHashTable,
  deleteHashTable,
  findHashTable,
  generateHashTable,
};
