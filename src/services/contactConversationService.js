import contactConversationRepository from "@/ipc-wrappers/contactConversationRepositoryWrapper";
import contactRepository from "@/ipc-wrappers/contactRepositoryWrapper";
// import Contact from "@/backend/models/contact";
// import ContactConversation from "@/backend/models/contactConversation";

const createContactChat = async (contactData) => {
  try {
    console.log("Contact chat creating...", contactData);
    console.log(
      "Inserted contact :",
      await contactRepository.insertContact(contactData)
    );
    let contact = await contactRepository.findContactByEmail(contactData.email);
    let contactConversation = await contactConversationRepository.insertContactConversation({
      contactId: contact.id,
    });
    console.log("Contact conversation added:", contactConversation)
  } catch (ex) {
    console.log(ex);
  }
};
export default {
  createContactChat,
};
