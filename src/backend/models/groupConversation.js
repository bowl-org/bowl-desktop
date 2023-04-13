import conversation from "./conversation";
const groupConversationModel = {
  id: 0,
  conversationId: 0,
  adminId: 0,
  groupKey: "",
  name: "",
  description: "",
};
const toConversation = (data) => {
  let newConversation = conversation.conversationModel
  Object.keys(data).forEach((key) => {
    Object.prototype.hasOwnProperty.call(conversation.conversationModel, key)
      ? (newConversation[key] = data[key])
      : "";
  });
  newConversation.id = data?.conversationId;
  return newConversation;
};
export default { groupConversationModel, toConversation };
