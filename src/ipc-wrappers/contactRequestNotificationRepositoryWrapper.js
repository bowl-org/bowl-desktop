const findContactRequestNotificationById = async (id) => {
  return window.ipcRenderer.invoke("findContactRequestNotificationById", id);
};
const findContactRequestNotificationByEmail = async (email) => {
  return window.ipcRenderer.invoke("findContactRequestNotificationByEmail", email);
};
const deleteContactRequestNotification = async (id) => {
  return window.ipcRenderer.invoke(
    "deleteContactRequestNotification",
    id
  );
};
const insertContactRequestNotification = async (contactRequestNotification) => {
  return window.ipcRenderer.invoke(
    "insertContactRequestNotification",
    contactRequestNotification
  );
};
const getAllContactRequestNotifications = async () => {
  return window.ipcRenderer.invoke("getAllContactRequestNotifications");
};
export default {
  findContactRequestNotificationById,
  findContactRequestNotificationByEmail,
  deleteContactRequestNotification,
  insertContactRequestNotification,
  getAllContactRequestNotifications,
};
