import { ipcMain } from "electron";
import contactRequestNotificationRepository from "../repository/contactRequestNotificationRepository";

ipcMain.handle("findContactRequestNotificationById", async (event, id) => {
  return await contactRequestNotificationRepository.findContactRequestNotificationById(id);
});
ipcMain.handle("findContactRequestNotificationByEmail", async (event, email) => {
  return await contactRequestNotificationRepository.findContactRequestNotificationByEmail(email);
});
ipcMain.handle("deleteContactRequestNotification", async (event, id) => {
  return contactRequestNotificationRepository.deleteContactRequestNotification(id);
});
ipcMain.handle("insertContactRequestNotification", async (event, args) => {
  return await contactRequestNotificationRepository.insertContactRequestNotification(args);
});
ipcMain.handle("getAllContactRequestNotifications", async (event, args) => {
  return await contactRequestNotificationRepository.getAllContactRequestNotifications(args);
});
