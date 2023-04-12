import Store from "@/store/index";
import groupRequestNotificationRepository from "../ipc-wrappers/groupRequestNotificationRepositoryWrapper";
import contactRequestNotificationRepository from "../ipc-wrappers/contactRequestNotificationRepositoryWrapper";
import socketService from "./socketService";

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
    await contactRequestNotificationRepository.insertContactRequestNotification(
      data
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
  if (requestData.type == "Contact") {
    // eslint-disable-next-line no-unused-vars
    let contactReq =
      await contactRequestNotificationRepository.findContactRequestNotificationById(
        requestData.id
      );
    console.log(requestData);
    await contactRequestNotificationRepository.deleteContactRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    //TODO add to contacts
    socketService.acceptContactRequest(contactReq.email);
  } else if (requestData.type == "Group") {
    // eslint-disable-next-line no-unused-vars
    let groupReq =
      await groupRequestNotificationRepository.findGroupRequestNotificationById(
        requestData.id
      );
    await groupRequestNotificationRepository.deleteGroupRequestNotification(
      requestData.id
    );
    decreaseNotificationCount();
    //TODO add to groups
    socketService.acceptGroupRequest(groupReq.email);
  }
  console.log("Notification accept:", requestData);
};
const declineRequest = async (requestData) => {
  if (requestData.type == "Contact") {
    // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
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
