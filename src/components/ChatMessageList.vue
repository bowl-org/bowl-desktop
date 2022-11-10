<template>
  <div
    class="scroll-reverser-div overflow-auto max-h-screen flex flex-col-reverse"
  >
    <div class="flex-col">
      <div
        class="message-container"
        v-for="(msg, index) in messages"
        :key="msg.id"
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
export default {
  name: "ChatMessageList",
  components: {
    ChatMessage,
    ChatDateSpan,
  },
  data() {
    return {
      messages: [
        {
          id: 1,
          date: "15 October 2022",
          time: "9:40",
          messageType: "sent",
          message:
            "Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt.",
        },
        {
          id: 2,
          date: "15 October 2022",
          time: "13:36",
          messageType: "",
          message:
            "Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt.",
        },
        {
          id: 3,
          date: "15 October 2022",
          time: "16:40",
          messageType: "",
          message: "Hello",
        },
        {
          id: 4,
          date: "18 October 2022",
          time: "12:40",
          messageType: "",
          message: "Hello world 18",
        },
        {
          id: 5,
          date: "18 October 2022",
          time: "18:40",
          messageType: "sent",
          message: "Hello world sent",
        },
        {
          id: 6,
          date: "01 November 2022",
          time: "12:43",
          messageType: "",
          message: "Hello",
        },
        {
          id: 7,
          date: "01 November 2022",
          time: "14:43",
          messageType: "sent",
          message: "Hello",
        },
      ],
    };
  },
  methos: {
    addNewMessage() {},
  },
};
</script>
