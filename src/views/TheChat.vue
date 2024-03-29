<template>
  <div
    class="the-chat bg-neutral-100 flex flex-col justify-between max-h-screen grow"
  >
    <div
      class="upper-chat relative bg-neutral-300 flex justify-between items-center"
    >
      <ConversationBar v-bind="conversation" @toggleFav="toggleFav" />
      <button @click="toggleChatMenu" class="w-12 h-12 text-3xl">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <ul
        v-if="showChatMenu"
        class="user-menu shadow-xl border-4 border-neutral-500/40 absolute top-16 right-5 font-medium bg-neutral-200 rounded-md"
      >
        <li
          @click="openConversationInfo"
          class="cursor-pointer bg-neutral-200 rounded-t px-3 py-1 text-left text-left hover:contrast-75"
        >
          Info
        </li>
        <li
          @click="searchMessages"
          class="cursor-pointer px-3 py-1 text-left bg-neutral-200 hover:contrast-75"
        >
          Search
        </li>
        <li
          @click="deleteConversation"
          class="cursor-pointer text-red-500 px-3 py-1 text-left bg-neutral-200 hover:contrast-75"
        >
          Delete
        </li>
      </ul>
    </div>
    <ChatMessageList ref="chatMessageList" />
    <EmojiSelection v-if="showEmojiSelection" @selectEmoji="selectEmoji" />
    <div
      class="bottom-chat bg-neutral-300 flex justify-center items-center p-4 pl-0"
    >
      <EmojiButton @click="toggleEmojiSelection" class="mr-auto ml-3" />
      <input
        type="text"
        v-model="inputVal"
        @keyup.enter="sendMessage"
        class="bg-white text-neutral-800 rounded-lg p-2 w-full ml-3"
        placeholder="Enter message"
      />
      <button
        class="w-12 h-10 ml-5 mr-5 rounded-full btn-send hover:bg-slate-600 text-center text-white"
        @click="sendMessage"
      >
        <font-awesome-icon icon="fa-regular fa-paper-plane" />
      </button>
    </div>
  </div>
</template>

<script>
import ConversationBar from "@/components/ConversationBar.vue";
import EmojiButton from "@/components/EmojiButton.vue";
import EmojiSelection from "@/components/modals/EmojiSelection.vue";
import ChatMessageList from "@/components/ChatMessageList.vue";
import contactConversationService from "@/services/contactConversationService";
import groupConversationService from "@/services/groupConversationService";

export default {
  name: "TheChat",
  components: {
    EmojiButton,
    EmojiSelection,
    ChatMessageList,
    ConversationBar,
  },
  data() {
    return {
      messages: [],
      isInFav: true,
      inputVal: "",
      showChatMenu: false,
      showEmojiSelection: false,
    };
  },
  computed: {
    conversation() {
      console.log(
        "CONVERSATION:",
        this.$store.getters.getConversationByIndex(
          this.$store.getters.activeConversationIndex
        )
      );
      this.closeEmojiSelection();
      return this.$store.getters.getConversationByIndex(
        this.$store.getters.activeConversationIndex
      );
    },
  },
  methods: {
    closeEmojiSelection() {
      this.showEmojiSelection = false;
    },
    openConversationInfo() {
      this.$router.push({
        name: "conversationinfo",
        params: { index: this.$store.getters.activeConversationIndex },
      });
    },
    async toggleFav() {
      this.$store.dispatch(
        "toggleConversationFav",
        this.$store.getters.activeConversationIndex
      );
      let conversation = this.$store.getters.getConversationByIndex(
        this.$store.getters.activeConversationIndex
      );
      console.log("Toggle Fav,Conversation Index:", conversation.index);
      if (conversation.conversationType == "Contact") {
        await contactConversationService.setFavoriteOfChat(
          conversation.conversationId,
          conversation.isFav
        );
      } else if (conversation.conversationType == "Group") {
        await groupConversationService.setFavoriteOfChat(
          conversation.conversationId,
          conversation.isFav
        );
      }
    },
    sendMessage() {
      this.$refs.chatMessageList.sendMessage(this.inputVal);
      this.inputVal = "";
    },
    toggleChatMenu() {
      this.showChatMenu = !this.showChatMenu;
    },
    toggleEmojiSelection() {
      this.showEmojiSelection = !this.showEmojiSelection;
    },
    selectEmoji(emoji) {
      this.inputVal += emoji;
    },
    async deleteConversation() {
      this.toggleChatMenu();
      let conversationType = this.conversation.conversationType;
      let activeConversationId = this.$store.getters.activeConversationId;
      console.log("Delete", conversationType);
      this.$router.push({
        name: "logo",
      });
      if (conversationType == "Contact") {
        await contactConversationService.deleteContact(activeConversationId);
      } else if (conversationType == "Group") {
        await groupConversationService.deleteGroup(activeConversationId);
      }
      this.$store.dispatch("setActiveConversationIndex", -1);
    },
    searchMessages() {
      this.toggleChatMenu();
      console.log("Search Messages");
    },
  },
};
</script>
<style>
.fav {
  color: #a499b3;
}
.btn-send {
  background-color: #a499b3;
}
</style>
