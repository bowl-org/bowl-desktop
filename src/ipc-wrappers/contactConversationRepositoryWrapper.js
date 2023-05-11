import ipcRendererHelper from "@/helpers/ipcRendererHelper";
const insertContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("insertContactConversation", contactConversationData);
};
const findContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("findContactConversation", contactConversationData);
};
const deleteContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("deleteContactConversation", contactConversationData);
};
const updateContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("updateContactConversation", contactConversationData);
};
const getContactConversationByUserId = async (userId) => {
  return ipcRendererHelper.invokeEvent("getContactConversationByUserId", userId);
};
export default{
  insertContactConversation,
  findContactConversation,
  deleteContactConversation,
  updateContactConversation,
  getContactConversationByUserId
}
