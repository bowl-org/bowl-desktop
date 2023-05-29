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
ipcMain.handle("setFavoriteOfGroupConversation", async (event, conversationData) => {
  return await groupConversationRepo.setFavoriteOfGroupConversation(conversationData);
});
ipcMain.handle("deleteGroupConversation", async (event, id) => {
  return await groupConversationRepo.deleteGroupConversation(id);
});
ipcMain.handle("findGroupConversationById", async (event, id) => {
  return await groupConversationRepo.findGroupConversationById(id);
});
ipcMain.handle("findGroupConversationByGroupIdOfUser", async (event, groupData) => {
  return await groupConversationRepo.findGroupConversationByGroupIdOfUser(groupData);
});
ipcMain.handle("getGroupConversationsByUserId", async (event, userId) => {
  return await groupConversationRepo.getGroupConversationsByUserId(userId);
});
