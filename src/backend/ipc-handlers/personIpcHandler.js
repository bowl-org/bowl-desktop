import { ipcMain } from "electron";
import personRepo from "../repository/personRepository";

ipcMain.handle("insertPerson", async (event, args) => {
  return await personRepo.insertPerson(args);
});
ipcMain.handle("updatePerson", async (event, args) => {
  return await personRepo.updatePerson(args);
});
ipcMain.handle("deletePerson", async (event, id) => {
  return await personRepo.deletePerson(id);
});
ipcMain.handle("findPerson", async (event, id) => {
  return await personRepo.findPerson(id);
});
ipcMain.handle("findPersonByEmail", async (event, email) => {
  return await personRepo.findPersonByEmail(email);
});
ipcMain.handle("getAllPersons", async () => {
  return await personRepo.getAllPersons();
});
