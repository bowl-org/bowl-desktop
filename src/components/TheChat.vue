<template>
  <div class="the-chat bg-neutral-100">
    <div class="upper-chat bg-neutral-300 flex justify-between items-center">
      <div class="current-chat-box flex items-center">
        <ConversationAvatar letter="M" class="rounded-md" />
        <div class="chat-box-info">
          <div class="flex items-center">
            <p class="font-medium">Mehmet Ümit Özden</p>
            <button class="fav-btn" @click="addOrRemoveFav">
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
            <p class="text-sm ml-3 text-gray-500">Online</p>
          </div>
        </div>
      </div>
      <button @click="open_options" class="w-12 h-12 text-3xl">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
    </div>
    <p class="m-5 p-2 bg-indigo-900 text-gray-300 rounded-tr-lg">Hello world</p>
    <p class="m-5 p-2 bg-indigo-900 text-gray-300 rounded-tr-lg">Hello world</p>
    <div class="bottom-chat bg-neutral-300 flex justify-center items-center p-3 pl-0 ">
      <EmojiSelection class="mr-auto ml-3"/>
      <input class="bg-neutral-200 text-gray-300 rounded-lg p-2 w-full ml-3" placeholder="Enter message" />
      <button
        class="w-10 h-10 ml-5  mr-2 rounded-full bg-sky-500 hover:bg-slate-600 text-center text-white"
        @click="add"
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

export default {
  name: "TheChat",
  components: {
    ConversationAvatar,
    OnlineDot,
    EmojiSelection
  },
  data() {
    return {
      messages: [],
      isInFav: true,
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
    add() {},
    open_options() {},
  },
};
</script>
<style>
.fav {
  color: #a499b3;
}
</style>
