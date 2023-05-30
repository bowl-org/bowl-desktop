import groupMessageRepo from "@/ipc-wrappers/groupMessageRepositoryWrapper";
import hashTableService from "./hashTableService";

const findMessage = async (messageData) => {
  return groupMessageRepo.findMessage(messageData);
};
const deleteMessage = async (messageData) => {
  return groupMessageRepo.deleteMessage(messageData);
};
const updateMessage = async (messageData) => {
  return groupMessageRepo.updateMessage(messageData);
};
const getLastMessageOfChat = async (groupConversationId) => {
  return await groupMessageRepo.getMessageCountByGroupConversationId(
    groupConversationId
  );
};
const addMessage = async (messageData, senderPublicKey) => {
  //TODO Create new hash table
    let groupConversationId = messageData.groupConversationId;
    // let hashTable = {};
    let prevHashId;
    let isFirstMessage =
      (await groupMessageRepo.getMessageCountByGroupConversationId(
        groupConversationId
      )) == 0;
    console.log(
      "Group message count:",
      await groupMessageRepo.getGroupMessagesByGroupConversationId(
        groupConversationId
      )
    );
    if (!isFirstMessage) {
      let lastMessageData = await getLastMessageOfChat(groupConversationId);
      prevHashId = lastMessageData.hashTableId;
    }
    let hashTable = await hashTableService.createHashTable(
      prevHashId,
      messageData.message,
      senderPublicKey
    );
    console.log("Message hash table:", hashTable);
    messageData.hashTableId = hashTable.id
  await groupMessageRepo.insertGroupMessage(messageData);
  // updateLastMessage(messageData.message, messageData.groupConversationId);
};
const getGroupMessages = async (groupConversationId) => {
  return groupMessageRepo.getGroupMessagesByGroupConversationId(groupConversationId);
};
// eslint-disable-next-line no-unused-vars
// const updateLastMessage = (msg, groupConversationId) => {
//   let payload = {
//     conversationId: groupConversationId,
//     lastMessage: msg,
//   };
//   console.log("Update last message of:", groupConversationId, msg);
//   Store.dispatch("setLastMessageOfConversation", payload);
// };

export default {
  findMessage,
  deleteMessage,
  updateMessage,
  addMessage,
  getGroupMessages,
  // updateLastMessage,
};
