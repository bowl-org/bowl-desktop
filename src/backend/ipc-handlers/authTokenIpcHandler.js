import { ipcMain } from "electron";
import authTokenRepo from "../repository/authTokenRepository";

ipcMain.handle("getToken", async (event, args) => {
  return await authTokenRepo.getToken(args);
});
ipcMain.handle("setToken", async (event, args) => {
  return await authTokenRepo.setToken(args);
});
ipcMain.handle("deleteToken", async (event, args) => {
  return await authTokenRepo.deleteToken(args);
});
