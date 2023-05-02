<template>
  <div class="flex flex-col justify-between items-center overflow-x-hidden">
    <template
      v-for="(conversation, index) in filteredConversationList"
      :key="conversation"
    >
      <ConversationBox
        v-if="
          (conversationType == 'Favorites' && conversation.isFav) ||
          conversationType == conversation.conversationType
        "
        :conversationName="conversation.name"
        :onlineStatus="conversation.onlineStatus"
        :isActive="conversation.isActive"
        :lastMessageTimestamp="conversation.lastMessageTimestamp"
        :lastMessage="conversation.lastMessage"
        :conversationType="conversation.conversationType"
        @click="selectConversation(index)"
      />
    </template>
  </div>
</template>

<script>
import ConversationBox from "./ConversationBox.vue";
// import messageService from "../services/messageService";
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
    searchFilter: {
      type: String,
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
      this.conversations[lastActiveIndex].isActive = "false";
      this.filteredConversationList[index].isActive = "true";
      this.$store.dispatch(
        "setActiveConversationId",
        this.filteredConversationList[index].conversationId
      );
      this.$router.push({
        name: "chat",
        params: { id: this.$store.getters.activeConversationId },
      });
    },
    loadConversations() {
      //Testing purposes
      // messageService.getAllMessages().then((messages) => {
      // let lastMessage = messages[messages.length - 1].message;
      let lastMessage = "This is last message";
      this.conversations = [
        {
          conversationId: 123,
          name: "Mehmet Ümit Özden",
          onlineStatus: "online",
          isActive: "false",
          lastMessageTimestamp: "01/11/2022",
          lastMessage: lastMessage,
          isFav: true,
          conversationType: "Contact",
        },
        {
          conversationId: 0,
          name: "Bill Joy",
          onlineStatus: "offline",
          isActive: "false",
          lastMessageTimestamp: "08/10/2022",
          lastMessage: "Hello, did you tried vi editor ",
          isFav: false,
          conversationType: "Contact",
        },
        {
          conversationId: 1,
          name: "Linus Torvalds",
          onlineStatus: "offline",
          isActive: "false",
          lastMessageTimestamp: "20/08/2022",
          lastMessage: "Talk is cheap. Show me the code.",
          isFav: true,
          conversationType: "Contact",
        },
        {
          conversationId: 3,
          name: "Demo Group",
          //onlineStatus: "offline",
          isActive: "false",
          lastMessageTimestamp: "20/08/2022",
          lastMessage: "This is group last message.",
          isFav: true,
          conversationType: "Group",
        },
      ];
      //Demonstration purposes
      this.$store.dispatch("deleteConversations");
      this.conversations.forEach((x) =>
        this.$store.dispatch("addConversation", x)
      );
      console.log("CONVERSATIONS VUEX:", this.$store.getters.conversations);
      this.$store.dispatch("setActiveConversationId", 1);
      this.selectConversation(1);
    },
  },
  computed: {
    filteredConversationList() {
      return this.$store.getters.conversations.filter((conversation) => {
        return conversation.name
          .toLowerCase()
          .includes(this.searchFilter.toLowerCase());
      });
    },
  },
  created() {
    this.loadConversations();
    console.log("CREATED");
  },
};
</script>
