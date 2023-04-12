import { ipcMain } from "electron";
import contactRequestNotificationRepository from "../repository/contactRequestNotificationRepository";

ipcMain.handle("findContactRequestNotificationById", async (event, args) => {
  return await contactRequestNotificationRepository.findContactRequestNotificationById(args);
});
ipcMain.handle("findContactRequestNotificationByEmail", async (event, args) => {
  return await contactRequestNotificationRepository.findContactRequestNotificationByEmail(args);
});
ipcMain.handle("deleteContactRequestNotification", async (event, args) => {
  return await contactRequestNotificationRepository.deleteContactRequestNotification(args);
});
ipcMain.handle("insertContactRequestNotification", async (event, args) => {
  return await contactRequestNotificationRepository.insertContactRequestNotification(args);
});
ipcMain.handle("getAllContactRequestNotifications", async (event, args) => {
  return await contactRequestNotificationRepository.getAllContactRequestNotifications(args);
});
