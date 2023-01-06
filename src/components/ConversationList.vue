<template>
  <div class="flex flex-col justify-between items-center overflow-x-hidden">
    <p class="white">Selected conversation type is: {{ conversationType }}</p>
    <ConversationBox
      v-for="(conversation, index) in conversations"
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
  methods: {
    selectConversation(index){
      //Simple way to set active only clicked conversation
      this.conversations.forEach( c => c.isActive = 'false');
      this.conversations[index].isActive = 'true';
    },
    loadConversations() {
      //Testing purposes
      messageService.getAllMessages().then((messages) => {
        let lastMessage = messages[messages.length - 1].message;
        this.conversations = [
          {
            name: "Mehmet Ümit Özden",
            onlineStatus: "online",
            isActive: "true",
            lastMessageTimestamp: "01/11/2022",
            lastMessage: lastMessage,
          },
          {
            name: "Bill Joy",
            onlineStatus: "offline",
            isActive: "false",
            lastMessageTimestamp: "08/10/2022",
            lastMessage: "Hello, did you tried vi editor ",
          },
          {
            name: "Linus Torvalds",
            onlineStatus: "offline",
            isActive: "false",
            lastMessageTimestamp: "20/08/2022",
            lastMessage: "Talk is cheap. Show me the code.",
          },
        ];
      });
    },
  },
  created() {
    this.loadConversations();
  },
};
</script>
