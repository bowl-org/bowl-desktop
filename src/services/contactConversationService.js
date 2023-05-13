import contactConversationRepo from "@/ipc-wrappers/contactConversationRepositoryWrapper";
import contactMessageRepo from "@/ipc-wrappers/contactMessageRepositoryWrapper";
import personService from "./personService";
import ContactConversation from "@/backend/models/contactConversation";
import Store from "@/store/index";
import socketService from "./socketService";
import contactMessageService from "./contactMessageService";

const formatContactConversation = async (conversation) => {
  let isOnline = socketService.getOnlineStatus();
  let lastMessageInfo = await getLastMessageDetailsOfChat(conversation.id);
  return {
    conversationId: conversation.id,
    name: conversation.name,
    onlineStatus: isOnline ? "online" : "offline",
    isActive: false,
    lastMessageTimestamp: lastMessageInfo?.date ?? "",
    lastMessage: lastMessageInfo?.message ?? "",
    isFav: conversation.isFavorite,
    conversationType: "Contact",
  };
};
const createContactChat = async (contactPersonData, userId) => {
  try {
    console.log("Contact chat creating...", {
      ...contactPersonData,
      userId: userId,
    });
    //Create new person if contact person not exists
    let contactPerson = await personService.findPersonByEmail(
      contactPersonData.email
    );
    if (contactPerson == null) {
      console.log("Contact person not found, new person creating...");
      contactPerson = await personService.createPerson(contactPersonData);
    }

    let contactConversationData = ContactConversation.contactConversationModel;
    contactConversationData.userId = userId;
    contactConversationData.contactPersonId = contactPerson.id;

    let contactConversation =
      await contactConversationRepo.insertContactConversation(
        contactConversationData
      );

    let contactChat = {
      ...contactConversation,
      name: (
        await personService.getPersonById(contactConversation.contactPersonId)
      ).name,
    };
    Store.dispatch(
      "addConversation",
      await formatContactConversation(contactChat)
    );
    console.log(
      "Contact conversation added:",
      await formatContactConversation(contactChat)
    );
  } catch (ex) {
    console.log(ex);
    throw new Error("Contact creation failed!");
  }
};
const getAllContactChatsOfUser = async (userId) => {
  let contactChats = [];
  let contactConversations =
    await contactConversationRepo.getContactConversationsByUserId(userId);
  for (const contactConversation of contactConversations) {
    contactChats.push({
      ...contactConversation,
      name: (
        await personService.getPersonById(contactConversation.contactPersonId)
      ).name,
    });
  }
  return contactChats;
};
const getLastMessageDetailsOfChat = async (contactConversationId) => {
  return await contactMessageRepo.getLastContactMessageByContactConversationId(
    contactConversationId
  );
};
const dispatchNewMessage = async (contactConversationId, messageData) => {
  console.log("Dispatch new Mesage:",messageData)
  await dispatchLastMessageDetail(contactConversationId);
  Store.dispatch("addMessage", messageData);
};
const dispatchLastMessageDetail = async (contactConversationId) => {
  let lastMessageDetail = await getLastMessageDetailsOfChat(
    contactConversationId
  );
  let payload = {
    conversationId: contactConversationId,
    lastMessageTimestamp: lastMessageDetail.date ?? "",
    lastMessage: lastMessageDetail.message ?? "",
  };
  console.log("Dispatch last message detail:", payload);
  Store.dispatch("setLastMessageDetailOfConversation", payload);
};
const getContactPersonDetail = async (contactConversationId) => {
  let contactConversation =
    await contactConversationRepo.findContactConversation(
      contactConversationId
    );
  return await personService.getPersonById(contactConversation.contactPersonId);
};
const setFavoriteOfChat = async (contactConversationId, isFavorite) => {
  await contactConversationRepo.updateContactConversation({
    id: contactConversationId,
    isFavorite: isFavorite,
  });
};
const deleteContact = async (contactConversationId) => {
  try {
    await contactConversationRepo.deleteContactConversation(
      contactConversationId
    );
    Store.dispatch("deleteConversation", contactConversationId);
  } catch (err) {
    console.log("Contact deletion failed!", err);
  }
};
const addMessageToChat = async (messageData) => {
  try {
    await contactMessageService.addMessage(messageData);
    await dispatchLastMessageDetail(messageData.contactConversationId);
  } catch (err) {
    console.log("Add message to chat failed!", err);
  }
};
const getContactPublicKey = async (contactConversationId) => {
  let contactPerson = await getContactPersonDetail(contactConversationId);
  console.log("Contact Public Key:", contactPerson?.publicKey);
  return contactPerson?.publicKey;
};
export default {
  createContactChat,
  getContactPersonDetail,
  getLastMessageDetailsOfChat,
  getAllContactChatsOfUser,
  dispatchNewMessage,
  dispatchLastMessageDetail,
  setFavoriteOfChat,
  formatContactConversation,
  deleteContact,
  addMessageToChat,
  getContactPublicKey,
};
