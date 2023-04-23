import ipcRendererHelper from "@/helpers/ipcRendererHelper";
//window.ipcRenderer defined in preload
const findMessage = async (messageData) => {
  return window.ipcRenderer.invoke("findMessage", messageData);
};
const deleteMessage = async (messageData) => {
  return window.ipcRenderer.invoke("deleteMessage", messageData);
};
const updateMessage = async (messageData) => {
  return window.ipcRenderer.invoke("updateMessage", messageData);
};
const insertMessage = async (messageData) => {
  return window.ipcRenderer.invoke("insertMessage", messageData);
};
const getAllMessages = async (conversationId) => {
  console.log("Conversation id repository wrapper:", conversationId);
  return ipcRendererHelper.invokeEvent("getAllMessages", conversationId);
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  insertMessage,
  getAllMessages,
};
