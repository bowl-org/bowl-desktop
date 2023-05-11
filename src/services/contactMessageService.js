import contactMessageRepo from "@/ipc-wrappers/contactMessageRepositoryWrapper";
import Store from "@/store/index";

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
  await contactMessageRepo.insertContactMessage(messageData);
  updateLastMessage(messageData.message, messageData.contactConversationId);
};
const getContactMessages = async (conversationId) => {
  return contactMessageRepo.getContactMessagesByContactConversationId(conversationId);
};
// eslint-disable-next-line no-unused-vars
const updateLastMessage = (msg, contactConversationId) => {
  //Demonstration
  // let targetConversationId = Store.getters.activeConversationId;
  let payload = {
    conversationId: contactConversationId,
    lastMessage: msg,
  };
  console.log("Update last message of:", contactConversationId, msg);
  Store.dispatch("setLastMessageOfConversation", payload);
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  addMessage,
  getContactMessages,
  updateLastMessage,
};
