<template>
  <div
    class="scroll-reverser-div overflow-y-auto overflow-x-hidden max-h-screen flex flex-col-reverse"
  >
    <div class="flex justify-center items-center">
      <div
        v-if="isFirstMessage"
        class="flex flex-col items-center justify-between w-1/3 m-5 p-5 font-bold text-slate-500 bg-neutral-200 rounded-tr-xl rounded-xl"
      >
        <p>No messages here yet...</p>
        <p>Start typing to send message!</p>
      </div>
    </div>
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
import contactMessageService from "../services/contactMessageService";
import groupMessageService from "../services/groupMessageService";
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
    isFirstMessage() {
      return this.messages.length == 0 ? true : false;
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
      let conversation = this.$store.getters.getConversationById(
        this.$store.getters.activeConversationId
      );
      console.log("Load messages conversation:", conversation);
      console.log("Conversations:", this.$store.getters.conversations);
      if (conversation.conversationType == "Contact") {
        contactMessageService
          .getContactMessages(this.$store.getters.activeConversationId)
          .then((messages) => {
            this.messages = messages;
          })
          .catch((err) => {
            console.log("Couldn't load messages!");
            console.log(err);
          });
      } else if (conversation.conversationType == "Group") {
        groupMessageService
          .getGroupMessages(this.$store.getters.activeConversationId)
          .then((messages) => {
            this.messages = messages;
          })
          .catch((err) => {
            console.log("Couldn't load messages!");
            console.log(err);
          });
      }
    },
    async sendMessage(message) {
      try {
        let conversation = this.$store.getters.getConversationById(
          this.$store.getters.activeConversationId
        );
        let msgData;
        if (conversation.conversationType == "Contact")
          msgData = await socketService.sendContactChatMessage(message);
        else if (conversation.conversationType == "Group")
          msgData = await socketService.sendGroupChatMessage(message);
        else throw new Error("Invalid conversation type!");
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
