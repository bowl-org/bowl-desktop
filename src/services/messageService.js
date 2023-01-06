//window.ipcRenderer defined in preload
const findMessage = async (messageData) => {
  return  window.ipcRenderer.invoke("findMessage", messageData);
};
const deleteMessage = async (messageData) => {
  return  window.ipcRenderer.invoke("deleteMessage", messageData);
};
const updateMessage = async (messageData) => {
  return  window.ipcRenderer.invoke("updateMessage", messageData);
};
const insertMessage = async (messageData) => {
  return  window.ipcRenderer.invoke("insertMessage", messageData);
};
const getAllMessages = async () => {
  return  window.ipcRenderer.invoke("getAllMessages");
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  insertMessage,
  getAllMessages,
};
