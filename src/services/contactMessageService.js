import contactMessageRepo from "@/ipc-wrappers/contactMessageRepositoryWrapper";

const findMessage = async (messageData) => {
  return contactMessageRepo.findMessage(messageData);
};
const deleteMessage = async (messageData) => {
  return contactMessageRepo.deleteMessage(messageData);
};
const updateMessage = async (messageData) => {
  return contactMessageRepo.updateMessage(messageData);
};
const addMessage = async (messageData) => {
  //TODO Create new hash table
  messageData.hashTableId = null;
  return await contactMessageRepo.insertContactMessage(messageData);
  // updateLastMessage(messageData.message, messageData.contactConversationId);
};
const getContactMessages = async (conversationId) => {
  return contactMessageRepo.getContactMessagesByContactConversationId(conversationId);
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  addMessage,
  getContactMessages,
};
