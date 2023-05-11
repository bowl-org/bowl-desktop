import contactConversationRepo from "@/ipc-wrappers/contactConversationRepositoryWrapper";
import personService from "./personService";
import ContactConversation from "@/backend/models/contactConversation";

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
      console.log("Contact person not found, new person creating...")
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
export default {
  createContactChat,
};
