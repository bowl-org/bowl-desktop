import io from "socket.io-client";
import Store from "@/store/index";
import messageService from "../services/messageService";
import requestNotificationService from "../services/requestNotificationService";
import cryptionService from "../services/cryptionService.js";
// import contactConversationService from "./contactConversationService";

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
  socket.on("chatMessage", (msgData) => {
    console.log("Message received: ", msgData);
    msgData = JSON.parse(msgData);
    console.log("Message received after: ", msgData);
    //Make sure message type is not sent
    // msgData["messageType"]= "";
    msgData.message = cryptionService.decryptData(
      Store.getters.user.privateKey,
      msgData.message
    );
    console.log("Received message inserted successfully!: ", msgData.message);
    // messageService
    //   .insertMessage(msgData)
    //   .then((msg) => {
    //     console.log("Received message inserted successfully!: ", msg);
    //     //if sender active conversation then
    //     //this.messages.push(msgData);
    //     messageService.updateLastMessage(msgData.message, 123);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
const acceptGroupRequest = () => {};
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
          // contactConversationService.createContactChat(res.contactData);
          console.log("Contact Req Callback Data:", res.contactData);
          resolve();
        }
      }
    );
  });
};
const sendChatMessage = async (message) => {
  console.log("message sent");
  let today = new Date();
  let todaySplit = today.toString().split(" ");
  // message = await cryptionService.encryptData( "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAj/Tz5uudUfOSNO5otkrxDn6xmQK8iuoHVyf4E4osxd5vQT9HEzrVHR1sJ7ok6bjyaa1DdJXUeoHAPAdvWrcNl+A9s7IopsYdCFIPuaTMsxatax3Mbw8ENwSdn8zkj0BWZ6OZJuQeKDyGFvKvEpJV3jPYvYXAeU1kowKPhOQBtzFqWK7EgbgiiORLAG0X9dGGKyZP/Pc81gD5e/EpteBdw9VaEPmDtNCMPpJhtD2gJMicSDtye2ABnUuEEfnmA584Xnu2P4wiHy9TBALs5c7bP4mQOOuM4R6fQOLlvLXr/0to8ASfhGMnT0w8eOuSIlSiY+FiwYhkpDI5Ja4U1ziEsQIDAQAB\n-----END PUBLIC KEY-----", message);
  let msgData = {
    date: todaySplit[2] + " " + todaySplit[1] + " " + todaySplit[3],
    time: today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0"),
    messageType: "sent",
    //Testing
    message: await cryptionService.encryptData(
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhPCWGrvSJpRMWq/aBmFmJhG+b4b2Mvm8QiVit+9nQKMLAp5rA+h1grBb36ZesmlAWxHcgVokIxdK6JHmXKHTBfzwE8X3Udb7O3CZBIKIkDeCXSblZN93tu3gYyFca4aqVLSpmR53IEQC+oxvhGWZ6VQg3ivV+IKtWZL6iYTAUWfXn+wmz6cj7zLMHss00Isz1b2b4y/s0vIZc6zF3/lOrQvytp/Djt+HYF05KR0vWD+o3hbBg2ignxZLcC1l2Gae/kXvoN3CsWtdU8TOvEaBUah6bdMpsZ0ZdqNVvV6ZkV6yBanZqcj8lbQKWjudD5YeTRqC2HdRvcDnadxJGQdcuQIDAQAB",
      message
    ),
  };
  console.log("Sent message data ", msgData);
  //////////// let msg = await messageService.insertMessage(msgData);
  //this.messages.push(msgData);
  messageService.updateLastMessage(message, 123);
  socket.emit("chatMessage", JSON.stringify(msgData));
  //Unencrypted message
  msgData.message = message;
  return msgData;
};
export default {
  initSocket,
  sendChatMessage,
  sendContactRequest,
  acceptContactRequest,
  declineContactRequest,
  acceptGroupRequest,
  declineGroupRequest,
  sendGroupRequest,
};
