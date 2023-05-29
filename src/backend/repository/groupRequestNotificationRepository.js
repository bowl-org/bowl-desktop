import queryRunner from "./commons/queryRunner";

const tableName = "group_request_notifications";
const insertGroupRequestNotification = async (notificationData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, groupId, groupKey, name, description) VALUES (@userId, @groupId, @groupKey, @name, @description)`,
    notificationData
  );
};
const deleteGroupRequestNotification = async (id) => {
  return queryRunner.deleteById(tableName, id);
};
const findGroupRequestNotificationById = async (id) => {
  return queryRunner.findById(tableName, id);
};
const findGroupRequestNotificationByGroupId = async (groupId) => {
  return queryRunner.getFromPreparedQuery(`SELECT * FROM ${tableName} WHERE groupId = ?`, groupId);
};
const getAllGroupRequestNotifications = async () => {
  return queryRunner.getAll(tableName);
};
export default {
  insertGroupRequestNotification,
  deleteGroupRequestNotification,
  findGroupRequestNotificationById,
  findGroupRequestNotificationByGroupId,
  getAllGroupRequestNotifications,
};
