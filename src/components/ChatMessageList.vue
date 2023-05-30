<template>
  <div
    class="scroll-reverser-div grow overflow-y-auto overflow-x-hidden max-h-screen flex flex-col-reverse"
  >
    <div v-if="isFirstMessage" class="flex grow justify-center items-center">
      <div
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
          :isSenderUser="msg.isSenderUser"
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
import contactConversationService from "@/services/contactConversationService";
import userService from "@/services/userService";
export default {
  name: "ChatMessageList",
  components: {
    ChatMessage,
    ChatDateSpan,
  },
  data() {
    return {
      //name: "",
      // messages: [],
    };
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
    name() {
      return this.$store.getters.user.name;
    },
    isFirstMessage() {
      return this.$store.getters.messages.length == 0 ? true : false;
    },
  },
  methods: {
    watchActiveConversationChanges() {
      this.$store.watch(
        (state, getters) => getters.activeConversationIndex,
        () => {
          console.log("WATCHER:", this.$store.getters.activeConversationIndex);
          this.loadMessages();
        }
      );
    },
    loadMessages() {
      console.log(
        "Load messages from db, Index:",
        this.$store.getters.activeConversationIndex
      );
      let conversation = this.$store.getters.getConversationByIndex(
        this.$store.getters.activeConversationIndex
      );
      console.log("Load messages conversation:", conversation);
      console.log("Conversations:", this.$store.getters.conversations);
      if (conversation.conversationType == "Contact") {
        contactConversationService.updateContactDetailIfChanged(
          this.$store.getters.activeConversationId
        );
        contactMessageService
          .getContactMessages(this.$store.getters.activeConversationId)
          .then((messages) => {
            this.$store.dispatch("setMessages", messages);
          })
          .catch((err) => {
            console.log("Couldn't load messages!");
            console.log(err);
          });
      } else if (conversation.conversationType == "Group") {
        groupMessageService
          .getGroupMessages(this.$store.getters.activeConversationId)
          .then((messages) => {
            userService.findUser(this.$store.getters.user.id).then((user) => {
              let personIdOfUser = user.personId;
              for (const message of messages) {
                message.isSenderUser = message.senderPersonId == personIdOfUser ? 1 : 0;
              }
              this.$store.dispatch("setMessages", messages);
            });
          })
          .catch((err) => {
            console.log("Couldn't load messages!");
            console.log(err);
          });
      }
    },
    async sendMessage(message) {
      try {
        let conversation = this.$store.getters.getConversationByIndex(
          this.$store.getters.activeConversationIndex
        );
        let msgData;
        if (conversation.conversationType == "Contact")
          msgData = await socketService.sendContactChatMessage(message);
        else if (conversation.conversationType == "Group") {
          msgData = await socketService.sendGroupChatMessage(message);
          msgData.isSenderUser = 1;
        } else throw new Error("Invalid conversation type!");
        this.$store.dispatch("addMessage", msgData);
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
