import contactConversationRepo from "@/ipc-wrappers/contactConversationRepositoryWrapper";
import contactMessageRepo from "@/ipc-wrappers/contactMessageRepositoryWrapper";
import personService from "./personService";
import ContactConversation from "@/backend/models/contactConversation";
import Store from "@/store/index";

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
    console.log("Contact conversation added:", contactConversation);
  } catch (ex) {
    console.log(ex);
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
export default {
  createContactChat,
  getLastMessageDetailsOfChat,
  getAllContactChatsOfUser,
  dispatchLastMessageDetail,
};
