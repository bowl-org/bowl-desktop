import { ipcMain } from "electron";
import contactMessageRepo from "../repository/contactMessageRepository";

ipcMain.handle("insertContactMessage", async (event, args) => {
  return await contactMessageRepo.insertContactMessage(args);
});
ipcMain.handle("updateContactMessage", async (event, args) => {
  return await contactMessageRepo.updateContactMessage(args);
});
ipcMain.handle("deleteContactMessage", async (event, id) => {
  return await contactMessageRepo.deleteContactMessage(id);
});
ipcMain.handle("findContactMessage", async (event, id) => {
  return await contactMessageRepo.findContactMessage(id);
});
ipcMain.handle("getContactMessagesByContactConversationId", async (event, contactConversationId) => {
  return await contactMessageRepo.getContactMessagesByContactConversationId(contactConversationId);
});
ipcMain.handle("getLastContactMessageByContactConversationId", async (event, contactConversationId) => {
  return await contactMessageRepo.getLastContactMessageByContactConversationId(contactConversationId);
});
