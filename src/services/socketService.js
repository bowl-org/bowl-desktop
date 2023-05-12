import io from "socket.io-client";
import Store from "@/store/index";
import contactConversationService from "./contactConversationService";
import contactMessageService from "./contactMessageService";
// import groupMessageService from "./groupMessageService";
import requestNotificationService from "./requestNotificationService";
import cryptionService from "./cryptionService.js";

let socket;
const initSocket = () => {
  socket = io(process.env.VUE_APP_BASE_URL, {
    path: `${process.env.VUE_APP_API_TOKEN}/socket.io`,
    extraHeaders: {
      token: Store.getters.token.data,
    },
  });
  errorListener();
  onlineListener();
  initOnlinePingSender();

  receiveChatMessageListener();
  contactRequestListener();
};
const initOnlinePingSender = () => {
  setInterval(() => {
    socket.emit("online", Store.getters.user.name);
  }, 10000);
};
const receiveChatMessageListener = () => {
  socket.on("chatMessage", async (msgData) => {
    console.log("Message received: ", msgData);
    msgData = JSON.parse(msgData);
    console.log("Message received after: ", msgData);
    //Make sure message type is not sent
    // msgData["messageType"]= "";
    msgData.message = await cryptionService.decryptData(
      Store.getters.user.privateKey,
      msgData.message
    );
    msgData.isSenderUser = 0;
    //TODO
    msgData.contactConversationId = Store.getters.activeConversationId;
    await contactMessageService.addMessage(msgData);
    await contactConversationService.dispatchLastMessageDetail(
      Store.getters.activeConversationId
    );
    console.log("Received message inserted successfully!: ", msgData.message);
  });
};
const errorListener = () => {
  socket.on("connect_error", (data) => {
    console.log("CONNECT_ERROR: ", data);
    console.log("SOCKET: ", socket);
  });
};
const onlineListener = () => {
  socket.on("online", (friendName) => {
    console.log(friendName + " is online");
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
const acceptGroupRequest = async() => {};
const declineGroupRequest = () => {};
const sendGroupRequest = () => {};
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
  // let todaySplit = today.toString().split(" ");
  let msgData = {
    // date: todaySplit[2] + " " + todaySplit[1] + " " + todaySplit[3],
    //In javascript months starts from 0 :)
    date: `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`,
    time: String(today.getHours()).padStart(2,"0") + ":" + String(today.getMinutes()).padStart(2, "0"),
    messageType: "",
    //Testing
    message: await cryptionService.encryptData(
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhPCWGrvSJpRMWq/aBmFmJhG+b4b2Mvm8QiVit+9nQKMLAp5rA+h1grBb36ZesmlAWxHcgVokIxdK6JHmXKHTBfzwE8X3Udb7O3CZBIKIkDeCXSblZN93tu3gYyFca4aqVLSpmR53IEQC+oxvhGWZ6VQg3ivV+IKtWZL6iYTAUWfXn+wmz6cj7zLMHss00Isz1b2b4y/s0vIZc6zF3/lOrQvytp/Djt+HYF05KR0vWD+o3hbBg2ignxZLcC1l2Gae/kXvoN3CsWtdU8TOvEaBUah6bdMpsZ0ZdqNVvV6ZkV6yBanZqcj8lbQKWjudD5YeTRqC2HdRvcDnadxJGQdcuQIDAQAB",
      message
    ),
  };
  console.log("Sent message data ", msgData);
  socket.emit("chatMessage", JSON.stringify(msgData));
  //Unencrypted message
  msgData.message = message;
  msgData.isSenderUser = 1;
  msgData.contactConversationId = Store.getters.activeConversationId;
  await contactMessageService.addMessage(msgData);
  await contactConversationService.dispatchLastMessageDetail(
    Store.getters.activeConversationId
  );
  return msgData;
};
const sendGroupChatMessage = async (message) => {
  console.log("sendGroupChatMessage not implemented yet!", message);
  return;
};
//TODO
//Online status of persons
const getOnlineStatus = () => {
  return true;
};
export default {
  initSocket,
  sendContactChatMessage,
  sendGroupChatMessage,
  sendContactRequest,
  acceptContactRequest,
  declineContactRequest,
  acceptGroupRequest,
  declineGroupRequest,
  sendGroupRequest,
  getOnlineStatus,
};
