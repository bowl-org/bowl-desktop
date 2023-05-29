import { ipcMain } from "electron";
import contactConversationRepo from "../repository/contactConversationRepository";

ipcMain.handle("insertContactConversation", async (event, conversationData) => {
  return await contactConversationRepo.insertContactConversation(
    conversationData
  );
});
ipcMain.handle("findContactConversation", async (event, id) => {
  return await contactConversationRepo.findContactConversation(id);
});
ipcMain.handle("updateContactConversation", async (event, conversationData) => {
  return await contactConversationRepo.updateContactConversation(
    conversationData
  );
});
ipcMain.handle("deleteContactConversation", async (event, id) => {
  return await contactConversationRepo.deleteContactConversation(id);
});
ipcMain.handle("getContactConversationsByUserId", async (event, userId) => {
  return await contactConversationRepo.getContactConversationsByUserId(userId);
});
ipcMain.handle("getContactConversationByContactPersonIdOfUser", async (event, args) => {
  return await contactConversationRepo.getContactConversationByContactPersonId(args[0], args[1]);
});
