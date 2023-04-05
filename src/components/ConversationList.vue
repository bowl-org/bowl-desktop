<template>
  <div class="flex flex-col justify-between items-center overflow-x-hidden">
    <p class="white">Selected conversation type is: {{ conversationType }}</p>
    <ConversationBox
      v-for="(conversation, index) in this.$store.getters.conversations"
      :key="conversation"
      :conversationName="conversation.name"
      :onlineStatus="conversation.onlineStatus"
      :isActive="conversation.isActive"
      :lastMessageTimestamp="conversation.lastMessageTimestamp"
      :lastMessage="conversation.lastMessage"
      @click="selectConversation(index)"
    />
  </div>
</template>

<script>
import ConversationBox from "./ConversationBox.vue";
import messageService from "../services/messageService";
export default {
  name: "ConversationList",
  components: {
    ConversationBox,
  },
  data() {
    return {
      conversations: [],
    };
  },
  props: {
    conversationType: {
      type: String,
      required: true,
    },
  },
  updated() {
    console.log("UPDATED");
  },
  methods: {
    selectConversation(index) {
      let activeConversationId = this.$store.getters.activeConversationId;
      let lastActiveIndex = this.conversations.findIndex(
        (x) => x.conversationId == activeConversationId
      );
      console.log("Last active index:", lastActiveIndex);
      console.log("Active conversation id:", activeConversationId);
      this.conversations[lastActiveIndex].isActive = 'false';
      this.conversations[index].isActive = "true";
      this.$store.dispatch(
        "setActiveConversationId",
        this.conversations[index].conversationId
      );
    },
    loadConversations() {
      //Testing purposes
      messageService.getAllMessages().then((messages) => {
        let lastMessage = messages[messages.length - 1].message;
        this.conversations = [
          {
            conversationId: 0,
            name: "Mehmet Ümit Özden",
            onlineStatus: "online",
            isActive: "false",
            lastMessageTimestamp: "01/11/2022",
            lastMessage: lastMessage,
            isFav: true,
          },
          {
            conversationId: 2,
            name: "Bill Joy",
            onlineStatus: "offline",
            isActive: "false",
            lastMessageTimestamp: "08/10/2022",
            lastMessage: "Hello, did you tried vi editor ",
            isFav: false,
          },
          {
            conversationId: 1,
            name: "Linus Torvalds",
            onlineStatus: "offline",
            isActive: "false",
            lastMessageTimestamp: "20/08/2022",
            lastMessage: "Talk is cheap. Show me the code.",
            isFav: true,
          },
        ];
        this.conversations.forEach((x) =>
          this.$store.dispatch("addConversation", x)
        );
        console.log("CONVERSATIONS VUEX:", this.$store.getters.conversations);
        this.$store.dispatch("setActiveConversationId", 1);
        this.selectConversation(1);
      });
    },
  },
  created() {
    this.loadConversations();
    console.log("CREATED");
  },
};
</script>
