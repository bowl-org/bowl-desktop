import groupConversationRepo from "@/ipc-wrappers/groupConversationRepositoryWrapper";
import groupMessageRepo from "@/ipc-wrappers/groupMessageRepositoryWrapper";

const getLastMessageDetailsOfChat = async (groupConversationId) => {
return await groupMessageRepo.getLastGroupMessageByGroupConversationId(groupConversationId);
};
const getAllGroupConversationsOfUser = async(userId) =>{
  return await groupConversationRepo.getGroupConversationsByUserId(userId);
}
export default {
  getLastMessageDetailsOfChat,
  getAllGroupConversationsOfUser
};
