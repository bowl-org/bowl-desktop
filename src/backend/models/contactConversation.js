import conversation from "./conversation";
const contactConversationModel = {
  ...conversation.conversationModel,
  conversationId: 0,
  contactId: 0,
};

const toConversation = (data) => {
  let newConversation = conversation.conversationModel
  Object.keys(data).forEach((key) => {
    Object.prototype.hasOwnProperty.call(conversation.conversationModel, key)
      ? (newConversation[key] = data[key])
      : "";
  });
  newConversation.id = data.conversationId;
  return newConversation;
};
export default { contactConversationModel, toConversation };
