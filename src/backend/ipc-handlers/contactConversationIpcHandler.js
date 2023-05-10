import { ipcMain } from "electron";
import contactConversationRepo from "../repository/contactConversationRepository";

ipcMain.handle("insertContactConversation", async (event, args) => {
  return await contactConversationRepo.insertContactConversation(args);
});
ipcMain.handle("findContactConversation", async (event, id) => {
  return await contactConversationRepo.findContactConversation(id)
});
ipcMain.handle("deleteContactConversation", async (event, args ) => {
  return await contactConversationRepo.deleteContactConversation(args)
});
ipcMain.handle("updateContactConversation", async (event, args ) => {
  return await contactConversationRepo.updateContactConversation(args)
});
ipcMain.handle("getAllContactConversations", async (event) => {
  return await contactConversationRepo.getAllContactConversations();
});
ipcMain.handle("findContactConversationByContactId", async (event, contactId) => {
  return await contactConversationRepo.findContactConversationByContactId(contactId)
});
