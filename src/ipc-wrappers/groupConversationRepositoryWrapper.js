import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const insertGroupConversation = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("insertGroupConversation", groupConversationData);
};
const findGroupConversationById = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("findGroupConversationById", groupConversationData);
};
const findGroupConversationByGroupIdOfUser = async (groupConversationData) => {
  return ipcRendererHelper.invokeEvent("findGroupConversationByGroupIdOfUser", groupConversationData);
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
  findGroupConversationById,
  findGroupConversationByGroupIdOfUser,
  deleteGroupConversation,
  updateGroupConversation,
  setFavoriteOfGroupConversation,
  getGroupConversationsByUserId,
}
