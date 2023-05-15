import { ipcMain } from "electron";
import nodeCryptionService from "../services/nodeCryptionService";

ipcMain.handle("generateKeyPair", async (event, args) => {
  return nodeCryptionService.generateKeyPair(args);
});
ipcMain.handle("encryptData", async (event, args) => {
  return nodeCryptionService.encryptData(args[0], args[1]);
});
ipcMain.handle("decryptData", async (event, args) => {
  return nodeCryptionService.decryptData(args[0], args[1]);
});
ipcMain.handle("generatePublicKeyFromPrivate", async (event, privateKey) => {
  return nodeCryptionService.generatePublicKeyFromPrivate(privateKey);
});
ipcMain.handle("createPublicKeyFromString", async (event, args) => {
  return nodeCryptionService.createPublicKeyFromString(args);
});
ipcMain.handle("createPrivateKeyFromString", async (event, args) => {
  return nodeCryptionService.createPrivateKeyFromString(args);
});
ipcMain.handle("generateHash", async (event, data) => {
  return nodeCryptionService.generateHash(data);
});
