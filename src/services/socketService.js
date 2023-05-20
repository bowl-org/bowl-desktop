import io from "socket.io-client";
import Store from "@/store/index";
import contactConversationService from "./contactConversationService";
// import contactMessageService from "./contactMessageService";
// import groupMessageService from "./groupMessageService";
import requestNotificationService from "./requestNotificationService";
import cryptionService from "./cryptionService.js";

let socket;
const initSocket = () => {
  socket =
    socket ??
    io(process.env.VUE_APP_BASE_URL, {
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
};
const disconnectFromSocket = async () => {
  await socket.disconnect();
  console.log("Socket connection closed!");
};
const onlineChatsHandler = () => {
  socket.on("onlineChats", async (onlineChatsData) => {
    console.log("Online chat data:", onlineChatsData);
    console.log("Online contacts:", onlineChatsData.contacts);
    console.log("Online groups:", onlineChatsData.groups);
    onlineChatsData.contacts.map(async (contactEmail) => {
      let contactConversation =
        await contactConversationService.getContactConversationByContactMail(
          contactEmail
        );
      await contactConversationService.setOnlineStatusOfChat(
        contactConversation.id,
        true
      );
    });
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
      contactConversation.id,
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
      contactConversation.id,
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
const acceptGroupRequest = async () => {
  //TODO
};
const declineGroupRequest = () => {
  //TODO
};
const sendGroupRequest = () => {
  //TODO
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

const getOnlineStatusOfContact = (conversationId) => {
  let conversation = Store.getters.getConversationById(conversationId);
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
