<template>
  <div class="the-chat bg-neutral-100 flex flex-col  justify-between max-h-screen">
    <div class="upper-chat bg-neutral-300 flex justify-between items-center">
      <div class="current-chat-box flex items-center">
        <ConversationAvatar letter="M" class="m-5 rounded-md" />
        <div class="chat-box-info">
          <div class="flex items-center">
            <p class="font-medium">Mehmet Ümit Özden</p>
            <button class="fav-btn active:animate-ping" @click="addOrRemoveFav">
              <font-awesome-icon
                v-if="isInFav"
                icon="fa-solid fa-heart"
                class="pl-3 text-lg fav"
              />
              <font-awesome-icon
                v-else
                icon="fa-regular fa-heart"
                class="pl-3 text-lg fav"
              />
            </button>
          </div>
          <div class="active-info flex items-center">
            <OnlineDot :status="status" />
            <p class="text-sm ml-3 text-gray-500">{{status}}</p>
          </div>
        </div>
      </div>
      <button @click="open_options" class="w-12 h-12 text-3xl">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
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
import ConversationAvatar from "./ConversationAvatar.vue";
import OnlineDot from "./OnlineDot.vue";
import EmojiSelection from "./modals/EmojiSelection.vue";
import ChatMessageList from "./ChatMessageList.vue"

export default {
  name: "TheChat",
  components: {
    ConversationAvatar,
    OnlineDot,
    EmojiSelection,
    ChatMessageList
  },
  data() {
    return {
      messages: [],
      isInFav: true,
      inputval: ''
    };
  },
  props: {
    status: {
      type: String,
      required: true,
    },
  },
  methods: {
    addOrRemoveFav() {
      this.isInFav = !this.isInFav;
    },
    sendMessage(){
      this.$refs.chatMessageList.sendMessage(this.inputVal);
    },
    open_options() {},
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
