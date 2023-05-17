import contactConversationRepo from "@/ipc-wrappers/contactConversationRepositoryWrapper";
import personService from "./personService";
import ContactConversation from "@/backend/models/contactConversation";
import Store from "@/store/index";
import socketService from "./socketService";
import contactMessageService from "./contactMessageService";
import * as apiService from "@/services/apiService";
import userService from "./userService";

const formatContactConversation = async (conversation) => {
  let isOnline = socketService.getOnlineStatusOfContact(conversation.id);
  let lastMessageInfo = await getLastMessageDetailsOfChat(conversation.id);
  return {
    conversationId: conversation.id,
    name: conversation.name,
    isOnline: isOnline,
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
  return await contactMessageService.getLastMessageOfChat(
    contactConversationId
  );
};
const dispatchNewMessage = async (contactConversationId, messageData) => {
  console.log("Dispatch new Mesage:", messageData);
  await dispatchLastMessageDetail(contactConversationId);
  Store.dispatch("addMessage", messageData);
};
const dispatchLastMessageDetail = async (contactConversationId) => {
  let lastMessageDetail = await getLastMessageDetailsOfChat(
    contactConversationId
  );
  let payload = {
    conversationId: contactConversationId,
    lastMessageTimestamp: lastMessageDetail?.date ?? "",
    lastMessage: lastMessageDetail?.message ?? "",
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
const setOnlineStatusOfChat = async (contactConversationId, isOnline) => {
  Store.dispatch("setOnlineStatusOfConversation", {
    conversationId: contactConversationId,
    isOnline: isOnline,
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
const getContactConversation = async (contactConversationId) => {
  return contactConversationRepo.findContactConversation(contactConversationId);
};
const addMessageToChat = async (messageData) => {
  try {
    let conversation = await getContactConversation(
      messageData.contactConversationId
    );
    let senderId = messageData.isSenderUser
      ? (await userService.findUser(conversation.userId)).personId
      : conversation.contactPersonId;
    let senderPublicKey = (await personService.getPersonById(senderId))
      .publicKey;
    await contactMessageService.addMessage(messageData, senderPublicKey);
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
const updateContactDetailIfChanged = async (contactConversationId) => {
  let contactPerson = await getContactPersonDetail(contactConversationId);
  let res = await apiService.GET(
    "/user/getUserDetails",
    `email=${contactPerson.email}`
  );
  let data = res.data;
  if (
    data.public_key != contactPerson.publicKey ||
    data.name != contactPerson.name
  ) {
    contactPerson.publicKey = data.public_key;
    contactPerson.name = data.name;
    console.log("Contact person details changed!:", contactPerson);
    return await personService.updatePerson(contactPerson);
  }
};
const getHashTablesOfConversation = async (contactConversationId) => {
  await contactMessageService.getContactHashTables(contactConversationId);
};
const getContactConversationByContactPersonId = async (contactPersonId) => {
  return await contactConversationRepo.getContactConversationByContactPersonId(
    contactPersonId
  );
};
const getContactConversationByContactMail = async (contactMail) => {
  try {
    let contactPerson = await personService.findPersonByEmail(contactMail);
    return await getContactConversationByContactPersonId(contactPerson.id);
  } catch (err) {
    throw new Error("Contact mail not found!");
  }
};
export default {
  createContactChat,
  getContactPersonDetail,
  getContactConversation,
  getLastMessageDetailsOfChat,
  getAllContactChatsOfUser,
  dispatchNewMessage,
  dispatchLastMessageDetail,
  setFavoriteOfChat,
  formatContactConversation,
  deleteContact,
  addMessageToChat,
  getContactPublicKey,
  updateContactDetailIfChanged,
  getHashTablesOfConversation,
  getContactConversationByContactMail,
  getContactConversationByContactPersonId,
  setOnlineStatusOfChat,
};
