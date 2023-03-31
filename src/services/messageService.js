import messageRepo from "../ipc-wrappers/messageRepositoryWrapper";

const findMessage = async (messageData) => {
  return  messageRepo.findMessage(messageData);
};
const deleteMessage = async (messageData) => {
  return  messageRepo.deleteMessage(messageData);
};
const updateMessage = async (messageData) => {
  return  messageRepo.updateMessage(messageData);
};
const insertMessage = async (messageData) => {
  return messageRepo.insertMessage(messageData);
};
const getAllMessages = async () => {
  return messageRepo.getAllMessages();
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  insertMessage,
  getAllMessages,
};
