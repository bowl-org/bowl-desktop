<template>
  <div
    class="scroll-reverser-div overflow-auto max-h-screen flex flex-col-reverse"
  >
    <div class="flex-col">
      <div
        class="message-container"
        v-for="(msg, index) in messages"
        :key="msg"
      >
        <ChatDateSpan
          v-if="index == 0 || messages[index - 1].date != msg.date"
          :date="msg.date"
        />
        <ChatMessage
          :time="msg.time"
          :messageType="msg.messageType"
          :message="msg.message"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ChatMessage from "./ChatMessage.vue";
import ChatDateSpan from "./ChatDateSpan.vue";
import io from "socket.io-client";
import messageService from "../services/messageService";
export default {
  name: "ChatMessageList",
  components: {
    ChatMessage,
    ChatDateSpan,
  },
  data() {
    return {
      name: "",
      messages: [],
    };
  },
  methods: {
    loadMessages() {
      console.log("Load messages from db");
      messageService
        .getAllMessages()
        .then((messages) => {
          this.messages = messages;
        })
        .catch((err) => {
          console.log("Couldn't load messages!");
          console.log(err);
        });
    },
    sendMessage(message) {
      console.log("message sent");
      let today = new Date();
      let todaySplit = today.toString().split(" ");
      let msgData = {
        date: todaySplit[2] + " " + todaySplit[1] + " " + todaySplit[3],
        time: today.getHours() + ":" + today.getMinutes(),
        messageType: "sent",
        message: message,
      };
      messageService.insertMessage(msgData)
        .then((msg) => {
          console.log('Sent message inserted successfully!: ', msg);
          this.messages.push(msgData);
          this.socket.emit("chatMessage", msgData);
        }).catch((err) => {
          console.log(err);
        });
    },
    receiveMessage(msgData) {
      //Make sure message type is not sent
      msgData.messageType = '';
      messageService.insertMessage(msgData)
        .then((msg) => {
          console.log('Received message inserted successfully!: ', msg);
          this.messages.push(msgData);
        }).catch((err) => {
          console.log(err);
        });

    },
  },
  created() {
    this.loadMessages();
    var sampleNameList = [
      "Mehmet Ümit Özden",
      "Onur Yılmaz",
      "Bill Joy",
      "Evan You",
      "Adam Wathan",
      "Steve Schoger",
      "Tim Berners-Lee",
    ];
    this.name =
      sampleNameList[Math.floor(Math.random() * sampleNameList.length)];
    //this.socket = io('localhost:3000', {path: `${process.env.VUE_APP_API_TOKEN}/socket.io`});
    this.socket = io(process.env.VUE_APP_BASE_URL, {
      path: `${process.env.VUE_APP_API_TOKEN}/socket.io`,
    });
    this.socket.on("chatMessage", (data) => {
      this.receiveMessage(data);
      console.log('Message received: ', data);
    });
    this.socket.on("online", (friendName) => {
      console.log(friendName + " is online");
    });
    setInterval(() => {
      this.socket.emit("online", this.name);
    }, 10000);
  },
};
</script>
