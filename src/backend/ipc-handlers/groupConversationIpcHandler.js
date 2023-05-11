import { ipcMain } from "electron";
import groupConversationRepo from "../repository/groupConversationRepository";

ipcMain.handle(
  "insertGroupConversation",
  async (event, groupConversationData) => {
    return await groupConversationRepo.insertGroupConversation(
      groupConversationData
    );
  }
);
ipcMain.handle("updateGroupConversation", async (event, conversationData) => {
  return await groupConversationRepo.updateGroupConversation(conversationData);
});
ipcMain.handle("deleteGroupConversation", async (event, id) => {
  return await groupConversationRepo.deleteGroupConversation(id);
});
ipcMain.handle("findGroupConversation", async (event, id) => {
  return await groupConversationRepo.findGroupConversation(id);
});
ipcMain.handle("getGroupConversationByUserId", async (event, userId) => {
  return await groupConversationRepo.getGroupConversationsByUserId(userId);
});
