import { ipcMain } from "electron";
import userRepo from "../repository/userRepository"

ipcMain.handle("insertUser", async (event, args) => {
  return await userRepo.insertUser(args);
});
ipcMain.handle("deleteUser", async (event, id) => {
  return await userRepo.deleteUser(id);
});
ipcMain.handle("updateUser", async (event, args) => {
  return await userRepo.updateUser(args);
});
ipcMain.handle("findUser", async (event, id) => {
  return await userRepo.findUser(id);
});
ipcMain.handle("findUserByEmail", async (event, email) => {
  return await userRepo.findUserByEmail(email);
});
ipcMain.handle("getAllUsers", async () => {
  return await userRepo.getAllUsers();
});
