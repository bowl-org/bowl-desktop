import { ipcMain } from "electron";
import userRepo from "../repository/userRepository"

ipcMain.handle("insertUser", async (event, args) => {
  return await userRepo.insertUser(args);
});
ipcMain.handle("deleteUser", async (event, args) => {
  return await userRepo.deleteUser(args);
});
ipcMain.handle("updateUser", async (event, args) => {
  return await userRepo.updateUser(args);
});
ipcMain.handle("findUser", async (event, args) => {
  return await userRepo.findUser(args);
});
ipcMain.handle("findUserByEmail", async (event, args) => {
  return await userRepo.findUserByEmail(args);
});
ipcMain.handle("getAllUsers", async (event, args) => {
  return await userRepo.getAllUsers(args);
});
