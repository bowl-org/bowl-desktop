import contactMessageRepo from "@/ipc-wrappers/contactMessageRepositoryWrapper";
import hashTableService from "./hashTableService";

const findMessage = async (messageData) => {
  return contactMessageRepo.findMessage(messageData);
};
const deleteMessage = async (messageData) => {
  return contactMessageRepo.deleteMessage(messageData);
};
const updateMessage = async (messageData) => {
  return contactMessageRepo.updateMessage(messageData);
};
const getLastMessageOfChat = async (contactConversationId) => {
  return await contactMessageRepo.getLastContactMessageByContactConversationId(
    contactConversationId
  );
};
const addMessage = async (messageData, senderPublicKey) => {
  try {
    // messageData.hashTableId = null;
    let contactConversationId = messageData.contactConversationId;
    // let hashTable = {};
    let prevHashId;
    let isFirstMessage =
      (await contactMessageRepo.getMessageCountByContactConversationId(
        contactConversationId
      )) == 0;
    console.log(
      "Contact message count:",
      await contactMessageRepo.getMessageCountByContactConversationId(
        contactConversationId
      )
    );
    if (!isFirstMessage) {
      let lastMessageData = await getLastMessageOfChat(contactConversationId);
      prevHashId = lastMessageData.hashTableId;
    }
    let hashTable = await hashTableService.createHashTable(
      prevHashId,
      messageData.message,
      senderPublicKey
    );
    console.log("Message hash table:", hashTable);
    messageData.hashTableId = hashTable.id
    return await contactMessageRepo.insertContactMessage(messageData);
    // updateLastMessage(messageData.message, messageData.contactConversationId);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const getContactMessages = async (conversationId) => {
  return contactMessageRepo.getContactMessagesByContactConversationId(
    conversationId
  );
};
const getContactHashTables = async (conversationId) => {
  return contactMessageRepo.getHashTablesByContactConversationId(
    conversationId
  );
};

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  addMessage,
  getContactMessages,
  getContactHashTables,
  getLastMessageOfChat,
};
