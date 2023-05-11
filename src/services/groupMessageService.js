import groupMessageRepo from "@/ipc-wrappers/groupMessageRepositoryWrapper";
import Store from "@/store/index";

const findMessage = async (messageData) => {
  return groupMessageRepo.findMessage(messageData);
};
const deleteMessage = async (messageData) => {
  return groupMessageRepo.deleteMessage(messageData);
};
const updateMessage = async (messageData) => {
  return groupMessageRepo.updateMessage(messageData);
};
const addMessage = async (messageData) => {
  //TODO Create new hash table
  await groupMessageRepo.insertMessage(messageData);
  updateLastMessage(messageData.message, messageData.groupConversationId);
};
const getAllMessages = async (groupConversationId) => {
  return groupMessageRepo.getAllMessages(groupConversationId);
};
// eslint-disable-next-line no-unused-vars
const updateLastMessage = (msg, groupConversationId) => {
  let payload = {
    conversationId: groupConversationId,
    lastMessage: msg,
  };
  console.log("Update last message of:", groupConversationId, msg);
  Store.dispatch("setLastMessageOfConversation", payload);
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  addMessage,
  getAllMessages,
  // updateLastMessage,
};
