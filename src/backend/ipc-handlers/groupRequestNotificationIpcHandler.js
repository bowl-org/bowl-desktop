import { ipcMain } from "electron";
import groupRequestNotificationRepository from "../repository/groupRequestNotificationRepository";

ipcMain.handle("findGroupRequestNotificationById", async (event, args) => {
  return await groupRequestNotificationRepository.findGroupRequestNotificationById(args);
});
ipcMain.handle("findGroupRequestNotificationByGroupId", async (event, args) => {
  return await groupRequestNotificationRepository.findGroupRequestNotificationByGroupId(args);
});
ipcMain.handle("deleteGroupRequestNotification", async (event, args) => {
  return await groupRequestNotificationRepository.deleteGroupRequestNotification(args);
});
ipcMain.handle("insertGroupRequestNotification", async (event, args) => {
  return await groupRequestNotificationRepository.insertGroupRequestNotification(args);
});
ipcMain.handle("getAllGroupRequestNotifications", async (event, args) => {
  return await groupRequestNotificationRepository.getAllGroupRequestNotifications(args);
});
