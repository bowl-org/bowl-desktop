import { ipcMain } from "electron";
import hashTableRepo from "../repository/hashTableRepository";

ipcMain.handle("insertHashTable", async (event, args) => {
  return await hashTableRepo.insertHashTable(args);
});
ipcMain.handle("updateHashTable", async (event, args) => {
  return await hashTableRepo.updateHashTable(args);
});
ipcMain.handle("deleteHashTable", async (event, id) => {
  return await hashTableRepo.deleteHashTable(id);
});
ipcMain.handle("findHashTable", async (event, id) => {
  return await hashTableRepo.findHashTable(id);
});
