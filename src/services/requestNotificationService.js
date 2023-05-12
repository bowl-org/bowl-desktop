import Store from "@/store/index";
import groupRequestNotificationRepository from "@/ipc-wrappers/groupRequestNotificationRepositoryWrapper";
import contactRequestNotificationRepository from "@/ipc-wrappers/contactRequestNotificationRepositoryWrapper";
import socketService from "./socketService";
import contactConversationService from "./contactConversationService";

const loadNotifications = async () => {
  let groupReqNotifications =
    await groupRequestNotificationRepository.getAllGroupRequestNotifications();
  let contactReqNotifications =
    await contactRequestNotificationRepository.getAllContactRequestNotifications();
  let notificationList = [];
  groupReqNotifications.forEach((notification) => {
    notificationList.push({
      id: notification.id,
      name: notification.name,
      description: notification.description,
      type: "Group",
    });
  });
  contactReqNotifications.forEach((notification) => {
    notificationList.push({
      id: notification.id,
      name: notification.name,
      email: notification.email,
      type: "Contact",
    });
  });
  //notificationList = [
  //  {
  //    id: 1,
  //    name: "Bill Joy",
  //    type: "Contact",
  //  },
  //  {
  //    id: 4,
  //    name: "Demo Group",
  //    type: "Group",
  //  },
  //  {
  //    id: 3,
  //    name: "Linus Torvalds",
  //    type: "Contact",
  //  },
  //  {
  //    id: 2,
  //    name: "Richard Stallman",
  //    type: "Contact",
  //  },
  //  {
  //    id: 5,
  //    name: "Dennis Ritchie",
  //    type: "Contact",
  //  },
  //];
  Store.dispatch("setNotificationCount", notificationList.length);
  return notificationList;
};
const increaseNotificationCount = async () => {
  Store.dispatch("increaseNotificationCount");
};
const decreaseNotificationCount = async () => {
  Store.dispatch("decreaseNotificationCount");
};
const addContactRequestNotification = async (data) => {
  try {
    console.log(
      "ADD CONTACT REQUEST NOTIFICATION CURR USER: ",
      Store.getters.user
    );
    await contactRequestNotificationRepository.insertContactRequestNotification(
      { userId: Store.getters.user.id, ...data }
    );
    increaseNotificationCount();
  } catch (err) {
    console.log(err.message);
    throw new Error("Email exists!");
  }
};
const addGroupRequestNotification = async (data) => {
  try {
    await groupRequestNotificationRepository.insertGroupRequestNotification(
      data
    );
    increaseNotificationCount();
    console.log("Notification:", data);
  } catch (err) {
    console.log(err);
  }
};
const acceptRequest = async (requestData) => {
  let req;
  if (requestData.type == "Contact") {
    req =
      await contactRequestNotificationRepository.findContactRequestNotificationById(
        requestData.id
      );
    await contactRequestNotificationRepository.deleteContactRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    socketService.acceptContactRequest(req.email);
    await contactConversationService.createContactChat(req, Store.getters.user.id);
  } else if (requestData.type == "Group") {
    req =
      await groupRequestNotificationRepository.findGroupRequestNotificationById(
        requestData.id
      );
    await groupRequestNotificationRepository.deleteGroupRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    await socketService.acceptGroupRequest(req.email);
  }
  console.log("Notification accept:", req);
};
const declineRequest = async (requestData) => {
  if (requestData.type == "Contact") {
    let contactReq =
      await contactRequestNotificationRepository.findContactRequestNotificationById(
        requestData.id
      );
    await contactRequestNotificationRepository.deleteContactRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    socketService.declineContactRequest(contactReq.email);
  } else if (requestData.type == "Group") {
    let groupReq =
      await groupRequestNotificationRepository.findGroupRequestNotificationById(
        requestData.id
      );
    await groupRequestNotificationRepository.deleteGroupRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    socketService.declineGroupRequest(groupReq.email);
    console.log("Notification decline:", requestData);
  }
};
export default {
  loadNotifications,
  acceptRequest,
  declineRequest,
  addContactRequestNotification,
  addGroupRequestNotification,
};
