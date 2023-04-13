import queryRunner from "./commons/queryRunner";

const tableName = "group_request_notifications";
const insertGroupRequestNotification = async (notificationData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, key, name, description) VALUES (@userId, @key, @name, @description)`,
    notificationData
  );
};
const deleteGroupRequestNotification = async (id) => {
  return queryRunner.deleteById(tableName, id);
};
const findGroupRequestNotificationById = async (id) => {
  return queryRunner.findById(tableName, id);
};
const getAllGroupRequestNotifications = async () => {
  return queryRunner.getAll(tableName);
};
export default {
  insertGroupRequestNotification,
  deleteGroupRequestNotification,
  findGroupRequestNotificationById,
  getAllGroupRequestNotifications,
};
