const findGroupRequestNotificationById = async (id) => {
  return window.ipcRenderer.invoke("findGroupRequestNotificationById", id);
};
const findGroupRequestNotificationByGroupId = async (groupId) => {
  return window.ipcRenderer.invoke("findGroupRequestNotificationByGroupId", groupId);
};
const deleteGroupRequestNotification = async (id) => {
  return window.ipcRenderer.invoke(
    "deleteGroupRequestNotification",
    id
  );
};
const insertGroupRequestNotification = async (groupRequestNotification) => {
  return window.ipcRenderer.invoke(
    "insertGroupRequestNotification",
    groupRequestNotification
  );
};
const getAllGroupRequestNotifications = async () => {
  return window.ipcRenderer.invoke("getAllGroupRequestNotifications");
};
export default {
  findGroupRequestNotificationById,
  findGroupRequestNotificationByGroupId,
  deleteGroupRequestNotification,
  insertGroupRequestNotification,
  getAllGroupRequestNotifications,
};
