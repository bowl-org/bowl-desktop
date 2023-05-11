import ipcRendererHelper from "@/helpers/ipcRendererHelper";

const findContactMessage = async (id) => {
  return ipcRendererHelper.invokeEvent("findContactMessage", id);
};
const deleteContactMessage = async (id) => {
  return ipcRendererHelper.invokeEvent("deleteContactMessage", id);
};
const updateContactMessage = async (messageData) => {
  return ipcRendererHelper.invokeEvent("updateContactMessage", messageData);
};
const insertContactMessage = async (messageData) => {
  return ipcRendererHelper.invokeEvent("insertContactMessage", messageData);
};
const getContactMessagesByContactConversationId = async (contactConversationId) => {
  return ipcRendererHelper.invokeEvent("getContactMessagesByContactConversationId", contactConversationId);
};

export default {
  findContactMessage,
  deleteContactMessage,
  updateContactMessage,
  insertContactMessage,
  getContactMessagesByContactConversationId,
};
