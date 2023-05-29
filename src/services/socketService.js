import io from "socket.io-client";
import Store from "@/store/index";
import contactConversationService from "./contactConversationService";
// import contactMessageService from "./contactMessageService";
// import groupMessageService from "./groupMessageService";
import requestNotificationService from "./requestNotificationService";
import cryptionService from "./cryptionService.js";
import groupConversationService from "./groupConversationService";
import * as apiService from "./apiService";

let socket;
const initSocket = () => {
  console.log("Socket:", socket);
  if (socket == null) {
    socket = io(process.env.VUE_APP_BASE_URL, {
      path: `${process.env.VUE_APP_API_TOKEN}/socket.io`,
      extraHeaders: {
        token: Store.getters.token.data,
      },
    });

    onlineChatsHandler();
    errorListener();
    onlineListener();
    offlineListener();
    receiveChatMessageListener();
    contactRequestListener();
    groupRequestListener();
    newGroupMemberListener();
  }
};
const disconnectFromSocket = async () => {
  await socket.disconnect();
  socket = null
  console.log("Socket connection closed!");
};
const onlineChatsHandler = () => {
  socket.on("onlineChats", async (onlineChatsData) => {
    console.log("Online chat data:", onlineChatsData);
    console.log("Online contacts:", onlineChatsData.contacts);
    console.log("Online groups:", onlineChatsData.groups);
    for (const contactEmail of onlineChatsData.contacts) {
      let contactConversation =
        await contactConversationService.getContactConversationByContactMail(
          contactEmail
        );
      console.log("Contact conversation Online handler:", contactConversation);
      await contactConversationService.setOnlineStatusOfChat(
        Store.getters.getContactConversationById(contactConversation.id).index,
        true
      );
    }
  });
};
const contactChatMessageListener = () => {
  socket.on("contactChatMessage", async (msgData) => {
    console.log("Contact message received: ", msgData);
    msgData = JSON.parse(msgData);
    console.log("Contact message received after: ", msgData);
    //Make sure message type is not sent
    // msgData["messageType"]= "";
    msgData.message = await cryptionService.decryptData(
      Store.getters.user.privateKey,
      msgData.message
    );
    msgData.isSenderUser = 0;
    //TODO
    // msgData.contactConversationId = Store.getters.activeConversationId;
    let fromEmail = msgData.from;
    msgData.contactConversationId = (
      await contactConversationService.getContactConversationByContactMail(
        fromEmail
      )
    ).id;
    if (msgData.contactConversationId == -1) {
      throw new Error("TODO: Select conversation to receive message");
    }

    await contactConversationService.addMessageToChat(msgData);
    await contactConversationService.dispatchNewMessage(
      msgData.contactConversationId,
      msgData
    );
    console.log("Received message inserted successfully!: ", msgData.message);
  });
};
const groupChatMessageListener = () => {
  socket.on("groupChatMessage", async (msgData) => {
    console.log("Group message received: ", msgData);
  });
};
const receiveChatMessageListener = () => {
  contactChatMessageListener();
  groupChatMessageListener();
};
const errorListener = () => {
  socket.on("connect_error", (data) => {
    console.log("CONNECT_ERROR: ", data);
    console.log("SOCKET: ", socket);
  });
};
const onlineListener = () => {
  socket.on("online", async (data) => {
    console.log("Online:", data);
    let contactConversation =
      await contactConversationService.getContactConversationByContactMail(
        data.email
      );
    await contactConversationService.setOnlineStatusOfChat(
      Store.getters.getContactConversationById(contactConversation.id).index,
      true
    );
  });
};
const offlineListener = () => {
  socket.on("offline", async (data) => {
    console.log("Offline:", data);
    let contactConversation =
      await contactConversationService.getContactConversationByContactMail(
        data.email
      );
    await contactConversationService.setOnlineStatusOfChat(
      Store.getters.getContactConversationById(contactConversation.id).index,
      false
    );
  });
};
const contactRequestListener = () => {
  socket.on("contactRequestReceived", async (data) => {
    try {
      console.log("CONTACT REQUEST RECEIVED:", data);
      await requestNotificationService.addContactRequestNotification(data);
      console.log("Contact request received and added! ", data);
    } catch (err) {
      console.log(err);
      console.log("Contact request received add failed!");
    }
  });
};
const newGroupMemberListener = () => {
  socket.on("newGroupMember", async (data) => {
    try {
      console.log("New GroupMember joined:", data);
      let personData = {
        name: data.name,
        email: data.email,
        publicKey: data.publicKey,
      };
      await groupConversationService.newGroupMemberJoined(
        Store.getters.user.id,
        data.groupId,
        personData
      );
    } catch (err) {
      console.log(err);
      console.log("New group member add failed!");
    }
  });
};
const groupRequestListener = () => {
  socket.on("groupRequestReceived", async (data) => {
    try {
      let notificationData = { ...data };
      console.log("GROUP REQUEST RECEIVED:", data);
      notificationData.groupKey = await cryptionService.decryptData(
        Store.getters.user.privateKey,
        data.encryptedGroupKey
      );
      delete notificationData.encryptedGroupKey;
      await requestNotificationService.addGroupRequestNotification(
        notificationData
      );
      console.log("Group request added! ", notificationData);
    } catch (err) {
      console.log(err);
      console.log("Group request received add failed!");
    }
  });
};
const acceptGroupRequest = async (groupId) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      "acceptGroupRequest",
      JSON.stringify({ groupId: groupId }),
      (res) => {
        if (res?.status != "OK") {
          reject(new Error(res?.error));
        } else {
          resolve(res?.members);
        }
      }
    );
  });
};
const declineGroupRequest = (groupId) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      "declineGroupRequest",
      JSON.stringify({ groupId: groupId }),
      (res) => {
        if (res?.status != "OK") {
          reject(new Error(res?.error));
        } else {
          resolve(res?.members);
        }
      }
    );
  });
};
const sendGroupRequest = async (memberEmail) => {
  try {
    let activeConversationId = Store.getters.activeConversationId;
    let group = await groupConversationService.getGroupConversationById(
      activeConversationId
    );
    let res = await apiService.GET(
      "/user/getUserDetails",
      `email=${memberEmail}`
    );
    let encryptedGroupKey = await cryptionService.encryptData(
      res.data.public_key,
      group.groupKey
    );
    let groupRequestData = {
      groupId: group.groupId,
      encryptedGroupKey: encryptedGroupKey,
      email: memberEmail,
    };
    return new Promise((resolve, reject) => {
      socket.emit(
        "sendGroupRequest",
        JSON.stringify(groupRequestData),
        (res) => {
          if (res?.status != "OK") {
            reject(Error(res?.error));
          } else {
            resolve();
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
    throw new Error("Send group request failed!");
  }
};
const acceptContactRequest = (email) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      "acceptContactRequest",
      JSON.stringify({ email: email }),
      (res) => {
        if (res?.status != "OK") {
          reject(new Error(res?.error));
        } else {
          resolve();
        }
      }
    );
  });
};
const declineContactRequest = (email) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      "declineContactRequest",
      JSON.stringify({ email: email }),
      (res) => {
        if (res?.status != "OK") {
          reject(new Error(res?.error));
        } else {
          resolve();
        }
      }
    );
  });
};
const sendContactRequest = (email) => {
  return new Promise((resolve, reject) => {
    socket.emit(
      "sendContactRequest",
      JSON.stringify({ email: email }),
      (res) => {
        if (res?.status != "OK") {
          reject(new Error(res?.error));
        } else {
          console.log("Contact Req Callback Data:", res.contactData);
          resolve(res.contactData);
        }
      }
    );
  });
};
const sendContactChatMessage = async (message) => {
  console.log("message sent");
  let today = new Date();
  let activeConversationId = Store.getters.activeConversationId;
  // let todaySplit = today.toString().split(" ");
  let msgData = {
    // date: todaySplit[2] + " " + todaySplit[1] + " " + todaySplit[3],
    //In javascript months starts from 0 :)
    date: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    time:
      String(today.getHours()).padStart(2, "0") +
      ":" +
      String(today.getMinutes()).padStart(2, "0"),
    messageType: "",
    message: await cryptionService.encryptData(
      await contactConversationService.getContactPublicKey(
        activeConversationId
      ),
      message
    ),
  };
  let toEmail = (
    await contactConversationService.getContactPersonDetail(
      activeConversationId
    )
  ).email;
  let payload = { ...msgData, to: toEmail };
  console.log("Sent message data ", payload);
  //Magic to wait calback
  await new Promise((resolve, reject) => {
    socket.emit("contactChatMessage", JSON.stringify(payload), (res) => {
      if (res.status == "ERROR") reject(new Error(res.error));
      else resolve();
    });
  });
  //Unencrypted message
  msgData.message = message;
  msgData.isSenderUser = 1;
  msgData.contactConversationId = Store.getters.activeConversationId;
  await contactConversationService.addMessageToChat(msgData);
  return msgData;
};
const sendGroupChatMessage = async (message) => {
  console.log("sendGroupChatMessage not implemented yet!", message);
  return;
};

const getOnlineStatusOfContact = (conversationIndex) => {
  let conversation = Store.getters.getConversationByIndex(conversationIndex);
  return conversation == null ? false : conversation.isOnline;
};
export default {
  initSocket,
  disconnectFromSocket,
  sendContactChatMessage,
  sendGroupChatMessage,
  sendContactRequest,
  acceptContactRequest,
  declineContactRequest,
  acceptGroupRequest,
  declineGroupRequest,
  sendGroupRequest,
  getOnlineStatusOfContact,
};
