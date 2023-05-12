import groupConversationRepo from "@/ipc-wrappers/groupConversationRepositoryWrapper";
import groupMessageRepo from "@/ipc-wrappers/groupMessageRepositoryWrapper";

const formatGroupConversation = async (conversation) => {
  let lastMessageInfo = await getLastMessageDetailsOfChat(conversation.id);
  return {
    conversationId: conversation.id,
    name: conversation.name,
    isActive: false,
    lastMessageTimestamp: lastMessageInfo.date ?? "",
    lastMessage: lastMessageInfo.message ?? "",
    isFav: conversation.isFavorite,
    conversationType: "Group",
  };
};

const getLastMessageDetailsOfChat = async (groupConversationId) => {
  return await groupMessageRepo.getLastGroupMessageByGroupConversationId(
    groupConversationId
  );
};
const getAllGroupConversationsOfUser = async (userId) => {
  return await groupConversationRepo.getGroupConversationsByUserId(userId);
};
const setFavoriteOfChat = async (contactConversationId, isFavorite) => {
  await groupConversationRepo.updateGroupConversation({
    id: contactConversationId,
    isFavorite: isFavorite,
  });
};
export default {
  getLastMessageDetailsOfChat,
  getAllGroupConversationsOfUser,
  setFavoriteOfChat,
  formatGroupConversation
};
