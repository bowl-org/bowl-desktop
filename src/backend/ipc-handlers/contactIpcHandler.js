import { ipcMain } from "electron";
import contactRepo from "../repository/contactRepository";

ipcMain.handle("insertContact", async (event, args) => {
  return await contactRepo.insertContact(args);
});
ipcMain.handle("updateContact", async (event, args) => {
  return await contactRepo.updateContact(args);
});
ipcMain.handle("deleteContact", async (event, args) => {
  return await contactRepo.deleteContact(args);
});
ipcMain.handle("findContact", async (event, args) => {
  return await contactRepo.findContact(args);
});
ipcMain.handle("findContactByEmail", async (event, email) => {
  return await contactRepo.findContactByEmail(email);
});
ipcMain.handle("findContactByPersonId", async (event, personId) => {
  return await contactRepo.findContactByPersonId(personId);
});
ipcMain.handle("getAllContacts", async (event) => {
  return await contactRepo.getAllContacts();
});
