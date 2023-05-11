import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const insertHashTable = async (hashTableData) => {
  return ipcRendererHelper.invokeEvent("insertHashTable", hashTableData);
};
const updateHashTable = async (hashTableData) => {
  return ipcRendererHelper.invokeEvent("updateHashTable", hashTableData);
};
const deleteHashTable = async (id) => {
  return ipcRendererHelper.invokeEvent("deleteHashTable", id);
};
const findHashTable = async (id) => {
  return ipcRendererHelper.invokeEvent("findHashTable", id);
};

export default {
  insertHashTable,
  updateHashTable,
  deleteHashTable,
  findHashTable,
};
