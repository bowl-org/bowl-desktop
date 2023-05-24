import groupConversationRepo from "@/ipc-wrappers/groupConversationRepositoryWrapper";
import groupMessageRepo from "@/ipc-wrappers/groupMessageRepositoryWrapper";
import GroupConversation from "@/backend/models/groupConversation";
import Store from "@/store/index";
import cryptionService from "./cryptionService";

const createGroupChat = async (userId, groupData) => {
  try {
    console.log("Group chat creating...", {
      ...groupData,
      userId: userId,
    });

    let groupConversation = GroupConversation.groupConversationModel;
    groupConversation.userId = userId;
    groupConversation.name = groupData.name;
    groupConversation.description = groupData.description;
    groupConversation.groupKey = await cryptionService.generateKey();

    let groupChat = await groupConversationRepo.insertGroupConversation(
      groupConversation
    );

    Store.dispatch(
      "addConversation",
      await formatGroupConversation(groupChat)
    );
    console.log(
      "Group conversation created:",
      await formatGroupConversation(groupChat)
    );
  } catch (err) {
    console.log(err);
    throw new Error("Group creation failed!");
  }
};
const formatGroupConversation = async (conversation) => {
  let lastMessageInfo = await getLastMessageDetailsOfChat(conversation.id);
  return {
    conversationId: conversation.id,
    name: conversation.name,
    description: conversation.description,
    groupKey: conversation.groupKey,
    isActive: false,
    lastMessageTimestamp: lastMessageInfo?.date ?? "",
    lastMessage: lastMessageInfo?.message ?? "",
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
  await groupConversationRepo.setFavoriteOfGroupConversation({
    id: contactConversationId,
    isFavorite: isFavorite,
  });
};
export default {
  createGroupChat,
  getLastMessageDetailsOfChat,
  getAllGroupConversationsOfUser,
  setFavoriteOfChat,
  formatGroupConversation,
};
