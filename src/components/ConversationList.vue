<template>
  <div class="flex flex-col justify-between items-center overflow-x-hidden">
    <template
      v-for="(conversation, index) in filteredConversationList"
      :key="conversation"
    >
      <ConversationBox
        v-if="
          (conversationType == 'Favorites' && conversation.isFav == 1) ||
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
      console.log("Select conversation index:", index);
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
    async fetchConversations() {
      let conversations = [];
      let groupConvesations =
        await groupConversationService.getAllGroupConversationsOfUser(
          this.$store.getters.user.id
        );
      for (const groupConversation of groupConvesations) {
        conversations.push(await groupConversationService.formatGroupConversation(groupConversation));
      }
      let contactConversations =
        await contactConversationService.getAllContactChatsOfUser(
          this.$store.getters.user.id
        );
      for (const contactConversation of contactConversations) {
        console.log("CONV for each:", contactConversation);
        conversations.push(
          await contactConversationService.formatContactConversation(contactConversation)
        );
      }
      return conversations;
    },
    loadConversations() {
      this.fetchConversations().then((conversations) => {
        this.$store.dispatch("deleteConversations");
        conversations.forEach((x) =>
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
          let activeConversationId = this.$store.getters.activeConversationId;
          if (activeConversationId != -1) {
            this.selectConversation(
              this.$store.getters.getConversationIndexById(activeConversationId)
            );
          }
        }
      });
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
