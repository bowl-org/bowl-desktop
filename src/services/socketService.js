import io from "socket.io-client";
import Store from "@/store/index";
import messageService from "../services/messageService";
import requestNotificationService from "../services/requestNotificationService";

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
    msgData = JSON.parse(JSON.stringify(msgData));
    console.log("Message received after: ", msgData);
    //Make sure message type is not sent
    msgData.messageType = "";
    messageService
      .insertMessage(msgData)
      .then((msg) => {
        console.log("Received message inserted successfully!: ", msg);
        //if sender active conversation then
        //this.messages.push(msgData);
        messageService.updateLastMessage(msgData.message, 123);
      })
      .catch((err) => {
        console.log(err);
      });
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
      await requestNotificationService.addContactRequestNotification(data);
    console.log("Contact request received and added! ", data);
    } catch (err) {
      console.log(err);
      console.log("Contact request received add failed!");
    }
  });
};
const acceptGroupRequest = () => {
}
const declineGroupRequest = () => {
}
const sendGroupRequest = () => {
}
const acceptContactRequest = (email) => {
  return new Promise((resolve, reject) => {
    socket.emit("acceptContactRequest", { email: email }, (res) => {
      if (res?.status != "OK") {
        reject(new Error(res?.error));
      } else {
        resolve();
      }
    });
  });
};
const declineContactRequest = (email) => {
  return new Promise((resolve, reject) => {
    socket.emit("declineContactRequest", { email: email }, (res) => {
      if (res?.status != "OK") {
        reject(new Error(res?.error));
      } else {
        resolve();
      }
    });
  });
};
const sendContactRequest = (email) => {
  return new Promise((resolve, reject) => {
    socket.emit("sendContactRequest", { email: email }, (res) => {
      if (res?.status != "OK") {
        reject(new Error(res?.error));
      } else {
        resolve();
      }
    });
  });
};
const sendChatMessage = async (message) => {
  console.log("message sent");
  let today = new Date();
  let todaySplit = today.toString().split(" ");
  let msgData = {
    date: todaySplit[2] + " " + todaySplit[1] + " " + todaySplit[3],
    time: today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0"),
    messageType: "sent",
    message: message,
  };
  let msg = await messageService.insertMessage(msgData);
  console.log("Sent message inserted successfully!: ", msg);
  //this.messages.push(msgData);
  messageService.updateLastMessage(message);
  socket.emit("chatMessage", msgData);
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
  sendGroupRequest
};
