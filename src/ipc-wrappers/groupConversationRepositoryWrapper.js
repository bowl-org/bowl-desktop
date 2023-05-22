import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const insertGroupConversation = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("insertGroupConversation", groupConversationData);
};
const findGroupConversation = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("findGroupConversation", groupConversationData);
};
const deleteGroupConversation = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("deleteGroupConversation", groupConversationData);
};
const updateGroupConversation = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("updateGroupConversation", groupConversationData);
};
const setFavoriteOfGroupConversation = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("setFavoriteOfGroupConversation", groupConversationData);
};
const getGroupConversationsByUserId = async (userId) => {
  return ipcRendererHelper.invokeEvent("getGroupConversationsByUserId", userId);
};
export default{
  insertGroupConversation,
  findGroupConversation,
  deleteGroupConversation,
  updateGroupConversation,
  setFavoriteOfGroupConversation,
  getGroupConversationsByUserId,
}
