import queryRunner from "./commons/queryRunner";

const tableName = "contact_request_notifications";
const insertContactRequestNotification = async (notificationData) => {
  return queryRunner.runPreparedQuery(
    `INSERT INTO ${tableName}(userId, publicKey, name, email) VALUES (@userId, @publicKey, @name, @email)`,
    notificationData
  );
};
const deleteContactRequestNotification = (id) => {
  return queryRunner.deleteById(tableName, id);
};
const findContactRequestNotificationById = async (id) => {
  return queryRunner.findById(tableName, id);
};
const findContactRequestNotificationByEmail = async (email) => {
  return queryRunner.getFromPreparedQuery(
    `SELECT * FROM ${tableName} WHERE email = ?`,
    email
  );
};
const getAllContactRequestNotifications = async () => {
  return queryRunner.getAll(tableName);
};
export default {
  insertContactRequestNotification,
  deleteContactRequestNotification,
  findContactRequestNotificationById,
  findContactRequestNotificationByEmail,
  getAllContactRequestNotifications,
};
