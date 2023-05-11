import { ipcMain } from "electron";
import groupMessageRepo from "../repository/groupMessageRepository";

ipcMain.handle("insertGroupMessage", async (event, args) => {
  return await groupMessageRepo.insertGroupMessage(args);
});
ipcMain.handle("getGroupMessagesByGroupConversationId", async (event, groupConversationId) => {
  return await groupMessageRepo.getGroupMessagesByGroupConversationId(groupConversationId);
});
ipcMain.handle("updateGroupMessage", async (event, args) => {
  return await groupMessageRepo.updateGroupMessage(args);
});
ipcMain.handle("deleteGroupMessage", async (event, id) => {
  return await groupMessageRepo.deleteGroupMessage(id);
});
ipcMain.handle("findGroupMessage", async (event, id) => {
  return await groupMessageRepo.findGroupMessage(id);
});
ipcMain.handle("getLastGroupMessageByGroupConversationId", async (event, groupConversationId) => {
  return await groupMessageRepo.getLastGroupMessageByGroupConversationId(groupConversationId);
});
