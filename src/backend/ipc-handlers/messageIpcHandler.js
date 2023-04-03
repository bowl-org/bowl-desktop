import { ipcMain } from "electron";
import messageRepo from "../repository/messageRepository";

ipcMain.handle("findMessage", async (event, args) => {
  return await messageRepo.findMessage(args);
});
ipcMain.handle("deleteMessage", async (event, args) => {
  return await messageRepo.deleteMessage(args);
});
ipcMain.handle("updateMessage", async (event, args) => {
  return await messageRepo.updateMessage(args);
});
ipcMain.handle("insertMessage", async (event, args) => {
  return await messageRepo.insertMessage(args);
});
ipcMain.handle("getAllMessages", async (event, args) => {
  return await messageRepo.getAllMessages(args);
});
