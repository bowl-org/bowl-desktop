import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const findGroupMessage = async (id) => {
  return ipcRendererHelper.invokeEvent("findGroupMessage", id);
};
const deleteGroupMessage = async (id) => {
  return ipcRendererHelper.invokeEvent("deleteGroupMessage", id);
};
const updateGroupMessage = async (messageData) => {
  return ipcRendererHelper.invokeEvent("updateGroupMessage", messageData);
};
const insertGroupMessage = async (messageData) => {
  return ipcRendererHelper.invokeEvent("insertGroupMessage", messageData);
};
const getGroupMessagesByGroupConversationId = async (groupConversationId) => {
  return ipcRendererHelper.invokeEvent("getGroupMessagesByGroupConversationId", groupConversationId);
};
const getLastGroupMessageByGroupConversationId = async (groupConversationId) => {
  return ipcRendererHelper.invokeEvent("getLastGroupMessageByGroupConversationId", groupConversationId);
};
export default {
  findGroupMessage,
  deleteGroupMessage,
  updateGroupMessage,
  insertGroupMessage,
  getGroupMessagesByGroupConversationId,
  getLastGroupMessageByGroupConversationId,
};
