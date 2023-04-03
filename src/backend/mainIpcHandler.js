import { ipcMain } from "electron";
import messageRepo from "./repository/messageRepository";
import authTokenRepo from "./repository/authTokenRepository";
import nodeCryptionService from "./services/nodeCryptionService";

//ipcMain.handle("findUser", async(event, args) => {
//return await userRepo.findUser(args);
//});
//ipcMain.handle("deleteUser", async(event, args) => {
//return await userRepo.deleteUser(args);
//});
//ipcMain.handle("updateUser", async(event, args) => {
//return await userRepo.updateUser(args);
//});
//ipcMain.handle("insertUser", async(event, args) => {
//return await userRepo.insertUser(args);
//});

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

ipcMain.handle("getToken", async (event, args) => {
  return await authTokenRepo.getToken(args);
});
ipcMain.handle("setToken", async (event, args) => {
  return await authTokenRepo.setToken(args);
});

ipcMain.handle("generateKeyPair", async (event, args) => {
  return nodeCryptionService.generateKeyPair(args);
});
ipcMain.handle("encryptData", async (event, args) => {
  return nodeCryptionService.encryptData(args[0], args[1]);
});
ipcMain.handle("decryptData", async (event, args) => {
  return nodeCryptionService.decryptData(args[0], args[1]);
});
ipcMain.handle("createPublicKeyFromString", async (event, args) => {
  return nodeCryptionService.createPublicKeyFromString(args);
});
ipcMain.handle("createPrivateKeyFromString", async(event, args) => {
  return nodeCryptionService.createPrivateKeyFromString(args);
});
