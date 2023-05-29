import Store from "@/store/index";
import groupRequestNotificationRepository from "@/ipc-wrappers/groupRequestNotificationRepositoryWrapper";
import contactRequestNotificationRepository from "@/ipc-wrappers/contactRequestNotificationRepositoryWrapper";
import socketService from "./socketService";
import contactConversationService from "./contactConversationService";
import groupConversationService from "./groupConversationService";

const loadNotifications = async () => {
  let groupReqNotifications =
    await groupRequestNotificationRepository.getAllGroupRequestNotifications();
  let contactReqNotifications =
    await contactRequestNotificationRepository.getAllContactRequestNotifications();
  let notificationList = [];
  groupReqNotifications.forEach((notification) => {
    notificationList.push({
      id: notification.id,
      groupId: notification.groupId,
      groupKey: notification.groupKey,
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
    console.log(
      "ADD GROUP REQUEST NOTIFICATION CURR USER: ",
      Store.getters.user
    );
    await groupRequestNotificationRepository.insertGroupRequestNotification(
      { userId: Store.getters.user.id, ...data }
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
    await contactConversationService.createContactChat(req, Store.getters.user.id);
    await socketService.acceptContactRequest(req.email);
  } else if (requestData.type == "Group") {
    req =
      await groupRequestNotificationRepository.findGroupRequestNotificationById(
        requestData.id
      );
    await groupRequestNotificationRepository.deleteGroupRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    let members = await socketService.acceptGroupRequest(req.groupId);
    console.log("Accept request members:", members);
    await groupConversationService.joinGroupConversation(Store.getters.user.id, req, members);
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
    socketService.declineGroupRequest(groupReq.groupId);
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
