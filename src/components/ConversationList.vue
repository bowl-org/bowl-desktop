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
import contactConversationService from "@/services/contactConversationService";
import groupConversationService from "@/services/groupConversationService";
import socketService from "@/services/socketService";
export default {
  name: "ConversationList",
  components: {
    ConversationBox,
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
      let lastActiveIndex = this.$store.getters.conversations.findIndex(
        (x) => x.conversationId == activeConversationId
      );
      console.log("Last active index:", lastActiveIndex);
      console.log("Active conversation id:", activeConversationId);
      if (lastActiveIndex != -1) {
        this.$store.getters.conversations[lastActiveIndex].isActive = false;
      }
      this.filteredConversationList[index].isActive = true;
      this.$store.dispatch(
        "setActiveConversationId",
        this.filteredConversationList[index].conversationId
      );
      this.$router.push({
        name: "chat",
        params: { id: this.$store.getters.activeConversationId },
      });
    },
    async initGroupConversation(conversation) {
      let lastMessageInfo =
        await groupConversationService.getLastMessageDetailsOfChat(
          conversation.id
        );
      return {
        conversationId: conversation.id,
        name: conversation.name,
        isActive: false,
        lastMessageTimestamp: lastMessageInfo.date ?? "",
        lastMessage: lastMessageInfo.message ?? "",
        isFav: conversation.isFavorite == 1 ? true : false,
        conversationType: "Group",
      };
    },
    async initContactConversation(conversation) {
      let isOnline = socketService.getOnlineStatus();
      let lastMessageInfo =
        await contactConversationService.getLastMessageDetailsOfChat(
          conversation.id
        );
      return {
        conversationId: conversation.id,
        name: conversation.name,
        onlineStatus: isOnline ? "online" : "offline",
        isActive: false,
        lastMessageTimestamp: lastMessageInfo?.date ?? "",
        lastMessage: lastMessageInfo?.message ?? "",
        isFav: conversation.isFavorite == 1 ? true : false,
        conversationType: "Contact",
      };
    },

    async loadConversations() {
      this.$store.dispatch("deleteConversations");

      let groupConvesations =
        await groupConversationService.getAllGroupConversationsOfUser(
          this.$store.getters.user.id
        );
      groupConvesations.forEach(async (conv) =>
        this.$store.getters.conversations.push(
          await this.initGroupConversation(conv)
        )
      );
      let contactConversations =
        await contactConversationService.getAllContactChatsOfUser(
          this.$store.getters.user.id
        );
      contactConversations.forEach(async (conv) => {
        console.log("CONV for each:", conv);
        this.$store.getters.conversations.push(
          await this.initContactConversation(conv)
        );
      });

      this.$store.getters.conversations.forEach((x) =>
        this.$store.dispatch("addConversation", x)
      );
      console.log("CONVERSATIONS VUEX:", this.$store.getters.conversations);
      if (this.$store.getters.conversations.length > 0) {
        console.log(
          "Conversation SELECT:",
          this.$store.getters.conversations[0]
        );
        console.log(
          "Conversation length",
          this.$store.getters.conversations.length
        );
        this.selectConversation(this.$store.getters.conversations[0].id);
      }
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
