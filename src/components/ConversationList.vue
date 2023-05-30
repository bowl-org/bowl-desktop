<template>
  <div class="flex flex-col justify-between items-center overflow-x-hidden">
    <template
      v-for="(conversation,index ) in filteredConversationList"
      :key="conversation"
    >
      <ConversationBox
        v-if="
          (conversationType == 'Favorites' && conversation.isFav == 1) ||
          conversationType == conversation.conversationType
        "
        :conversationName="conversation.name"
        :isOnline="conversation.isOnline"
        :isActive="conversation.isActive"
        :lastMessageTimestamp="conversation.lastMessageTimestamp"
        :lastMessage="conversation.lastMessage"
        :conversationType="conversation.conversationType"
        @click="selectConversation(conversation.index, index)"
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
    selectConversation(index, filteredIndex) {
      let activeConversationIndex = this.$store.getters.activeConversationIndex;
      console.log("Select conversation index:", index);
      console.log("Active conversation index:", activeConversationIndex);
      if (activeConversationIndex != -1) {
        this.$store.getters.conversations[this.$store.getters.getRealIndex(activeConversationIndex)].isActive = false;
      }
      this.filteredConversationList[filteredIndex].isActive = true;
      this.$store.dispatch(
        "setActiveConversationIndex",
        this.filteredConversationList[filteredIndex].index
      );
      this.$router.push({
        name: "chat",
        params: { index: this.$store.getters.activeConversationIndex },
      });
    },
    async fetchConversations() {
      let conversations = [];
      let index = 0;
      let groupConvesations =
        await groupConversationService.getAllGroupConversationsOfUser(
          this.$store.getters.user.id
        );
      for (const groupConversation of groupConvesations) {
        console.log("Group conversation for each:", groupConversation, "index:", index);
        conversations.push(await groupConversationService.formatGroupConversation(groupConversation, index));
        index += 1;
      }
      let contactConversations =
        await contactConversationService.getAllContactChatsOfUser(
          this.$store.getters.user.id
        );
      for (const contactConversation of contactConversations) {
        console.log("Contact conversation for each:", contactConversation, "index:", index);
        conversations.push(
          await contactConversationService.formatContactConversation(contactConversation,index )
        );
        index += 1;
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
          let activeConversationIndex = this.$store.getters.activeConversationIndex;
          if (activeConversationIndex != -1) {
            this.selectConversation(activeConversationIndex, activeConversationIndex);
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
