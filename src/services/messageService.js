import messageRepo from "../ipc-wrappers/messageRepositoryWrapper";
import Store from "@/store/index";

const findMessage = async (messageData) => {
  return messageRepo.findMessage(messageData);
};
const deleteMessage = async (messageData) => {
  return messageRepo.deleteMessage(messageData);
};
const updateMessage = async (messageData) => {
  return messageRepo.updateMessage(messageData);
};
const insertMessage = async (messageData) => {
  return messageRepo.insertMessage(messageData);
};
// eslint-disable-next-line no-unused-vars
const getAllMessages = async (conversationId) => {
  return messageRepo.getAllMessages();
};
// eslint-disable-next-line no-unused-vars
const updateLastMessage = (msg, conversationId) => {
  //Demonstration
  let targetConversationId = Store.getters.activeConversationId;
  let payload = {
    conversationId: targetConversationId,
    lastMessage: msg,
  };
  console.log("Update last message of:",targetConversationId, msg);
  Store.dispatch("setLastMessageOfConversation", payload);
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  insertMessage,
  getAllMessages,
  updateLastMessage,
};
