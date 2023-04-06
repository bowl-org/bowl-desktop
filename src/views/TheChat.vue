<template>
  <div class="the-chat bg-neutral-100 flex flex-col  justify-between max-h-screen grow">
    <div class="upper-chat relative bg-neutral-300 flex justify-between items-center">
      <ConversationBar v-bind="conversation" @toggleFav="toggleFav"/>
      <button @click="toggleChatMenu" class="w-12 h-12 text-3xl">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <ul v-if="showChatMenu" class="user-menu shadow-xl border-4 border-neutral-500/40 absolute top-16 right-5 font-medium bg-neutral-200 rounded-md ">
        <li class="cursor-pointer bg-neutral-200 rounded-t px-3 py-1 text-left text-left hover:contrast-75 ">Info</li>
        <li class="cursor-pointer px-3 py-1 text-left bg-neutral-200 hover:contrast-75">Search</li>
        <li @click="closeApp()" class="cursor-pointer rounded-b px-3 py-1 text-left bg-neutral-200 hover:contrast-75 hover:text-red-900" >Exit</li>
      </ul>
    </div>
    <ChatMessageList ref="chatMessageList"/>
    <div
      class="bottom-chat bg-neutral-300 flex justify-center items-center p-4 pl-0"
    >
      <EmojiSelection class="mr-auto ml-3" />
      <input
        type="text"
        v-model="inputVal"
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
import EmojiSelection from "@/components/modals/EmojiSelection.vue";
import ChatMessageList from "@/components/ChatMessageList.vue"
// eslint-disable-next-line no-unused-vars
import electronIpcWrapper from "@/ipc-wrappers/electronIpcWrapper";

export default {
  name: "TheChat",
  components: {
    EmojiSelection,
    ChatMessageList,
    ConversationBar
  },
  data() {
    return {
      messages: [],
      isInFav: true,
      inputVal: '',
      showChatMenu: false
    };
  },
  computed: {
    conversation(){
      console.log("CONVERSATION:",this.$store.getters.getConversationById(this.$store.getters.activeConversationId));
      return this.$store.getters.getConversationById(this.$store.getters.activeConversationId);
    }
  },
  methods: {
    closeApp(){
      electronIpcWrapper.closeApp();
    },
    toggleFav(){
      this.$store.dispatch("toggleConversationFav", this.$store.getters.activeConversationId);
    },
    sendMessage(){
      this.$refs.chatMessageList.sendMessage(this.inputVal);
    },
    toggleChatMenu() {
      this.showChatMenu = !this.showChatMenu;
    },

  },
};
</script>
<style>
.fav {
  color: #a499b3;
}
.btn-send{
  background-color: #A499B3;
}
</style>
