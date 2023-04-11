<template>
  <div
    class="scroll-reverser-div overflow-y-auto overflow-x-hidden max-h-screen flex flex-col-reverse"
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
import messageService from "../services/messageService";
import socketService from "../services/socketService";
export default {
  name: "ChatMessageList",
  components: {
    ChatMessage,
    ChatDateSpan,
  },
  data() {
    return {
      //name: "",
      messages: [],
    };
  },
  computed: {
    name() {
      return this.$store.getters.user.name;
    },
  },
  methods: {
    watchActiveConversationChanges() {
      this.$store.watch(
        (state, getters) => getters.activeConversationId,
        () => {
          console.log("WATCHER:", this.$store.getters.activeConversationId);
          this.loadMessages();
        }
      );
    },
    loadMessages() {
      console.log(
        "Load messages from db, ID:",
        this.$store.getters.activeConversationId
      );
      messageService
        .getAllMessages(this.$store.getters.activeConversationId)
        .then((messages) => {
          this.messages = messages;
        })
        .catch((err) => {
          console.log("Couldn't load messages!");
          console.log(err);
        });
    },
    async sendMessage(message) {
      try {
        let msgData = await socketService.sendChatMessage(message);
        this.messages.push(msgData);
      } catch (err) {
        console.log("Send message err:", err);
      }
    },
  },
  created() {
    this.loadMessages();
    this.watchActiveConversationChanges();
  },
};
</script>
