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
    <input class="bg-slate-500 text-gray-300" placeholder="Enter message" />
    <button
      class="w-8 h-8 ml-5 rounded-full bg-sky-500 hover:bg-slate-600 text-white"
      @click="add"
    >
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
    <HelloWorld class="text-gray-300" msg="P2P Chat System" />
    <div class="bg-gray-300 text-sky-500 hover:font-bold">Bold on hover</div>
  </div>
</template>

<script>
import HelloWorld from "./HelloWorld.vue";
import ConversationAvatar from "./ConversationAvatar.vue";
import OnlineDot from "./OnlineDot.vue";

export default {
  name: "TheChat",
  components: {
    HelloWorld,
    ConversationAvatar,
    OnlineDot,
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
