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
export default {
  name: "ChatMessageList",
  components: {
    ChatMessage,
    ChatDateSpan,
  },
  data() {
    return {
      name: '',
      messages: [
        {
          date: "15 October 2022",
          time: "9:40",
          messageType: "sent",
          message:
            "Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt.",
        },
        {
          date: "15 October 2022",
          time: "13:36",
          messageType: "",
          message:
            "Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt.",
        },
        {
          date: "15 October 2022",
          time: "16:40",
          messageType: "",
          message: "Hello",
        },
        {
          date: "18 October 2022",
          time: "12:40",
          messageType: "",
          message: "Hello world 18",
        },
        {
          date: "18 October 2022",
          time: "18:40",
          messageType: "sent",
          message: "Hello world sent",
        },
        {
          date: "01 November 2022",
          time: "12:43",
          messageType: "",
          message: "Hello",
        },
        {
          date: "01 November 2022",
          time: "14:43",
          messageType: "sent",
          message: "Hello",
        },
      ],
    };
  },
  methods: {
    sendMessage(message) {
      console.log("message sent")
      var msgData = this.addNewMessage("sent", message);
      //msgData.messageType = ''
      this.socket.emit("chatMessage", msgData);
    },
    addNewMessage(messageType, message) {
      let today = new Date();
      let todaySplit = today.toString().split(" ");
      this.messages.push({
        date: todaySplit[2] + " " + todaySplit[1] + " " + todaySplit[3],
        time: today.getHours() + ":" + today.getMinutes(),
        messageType: messageType,
        message: message,
      });
      return this.messages[this.messages.length - 1];
    },
  },
  created() {
    var sampleNameList = ['Mehmet Ümit Özden', 'Onur Yılmaz', 'Bill Joy', 'Evan You', 'Adam Wathan', 'Steve Schoger', 'Tim Berners-Lee']
    this.name = sampleNameList[Math.floor(Math.random() * sampleNameList.length)];
    //this.socket = io('localhost:3000', {path: `${process.env.VUE_APP_API_TOKEN}/socket.io`});
    this.socket = io(process.env.VUE_APP_BASE_URL, {path: `${process.env.VUE_APP_API_TOKEN}/socket.io`});
    this.socket.on("chatMessage", (data) => {
      console.log("Message received")
      console.log(data);
      this.addNewMessage(data.messageType, data.message);
    });
    this.socket.on("online", (friendName) => {
		console.log(friendName + ' is online')
	});
    setInterval(() => {
        this.socket.emit('online', this.name);
    }, 10000)
  },
};
</script>
