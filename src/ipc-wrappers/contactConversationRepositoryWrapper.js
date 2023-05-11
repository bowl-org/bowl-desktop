import ipcRendererHelper from "@/helpers/ipcRendererHelper";
const insertContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("insertContactConversation", contactConversationData);
};
const findContactConversation = async (id) => {
  return ipcRendererHelper.invokeEvent("findContactConversation", id);
};
const deleteContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("deleteContactConversation", contactConversationData);
};
const updateContactConversation = async (contactConversationData) => {
  return ipcRendererHelper.invokeEvent("updateContactConversation", contactConversationData);
};
const getContactConversationsByUserId = async (userId) => {
  return ipcRendererHelper.invokeEvent("getContactConversationsByUserId", userId);
};
export default{
  insertContactConversation,
  findContactConversation,
  deleteContactConversation,
  updateContactConversation,
  getContactConversationsByUserId
}
