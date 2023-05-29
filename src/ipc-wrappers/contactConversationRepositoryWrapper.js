import ipcRendererHelper from "@/helpers/ipcRendererHelper";
const insertContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("insertContactConversation", contactConversationData);
};
const findContactConversation = async (id) => {
  return ipcRendererHelper.invokeEvent("findContactConversation", id);
};
const deleteContactConversation = async (id) => {
  return ipcRendererHelper.invokeEvent("deleteContactConversation", id);
};
const updateContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("updateContactConversation", contactConversationData);
};
const getContactConversationsByUserId = async (userId) => {
  return ipcRendererHelper.invokeEvent("getContactConversationsByUserId", userId);
};
const getContactConversationByContactPersonIdOfUser = async (userId, contactPersonId) => {
  return ipcRendererHelper.invokeEvent("getContactConversationByContactPersonIdOfUser", [userId, contactPersonId]);
};
export default{
  insertContactConversation,
  findContactConversation,
  deleteContactConversation,
  updateContactConversation,
  getContactConversationsByUserId,
  getContactConversationByContactPersonIdOfUser
}
