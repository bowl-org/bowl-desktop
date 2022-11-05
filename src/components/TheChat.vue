<template>
  <div class="the-chat bg-neutral-100 flex flex-col justify-between max-h-screen">
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
            <p class="text-sm ml-3 text-gray-500">{{status}}</p>
          </div>
        </div>
      </div>
      <button @click="open_options" class="w-12 h-12 text-3xl">
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
    </div>
    <div class="message-container overflow-auto max-h-screen  ">
    <ChatMessage  message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. " time="11:40"/>
    <ChatMessage messageType="sent" message="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." time="9.40"/>
    <ChatMessage  message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. " time="11:40"/>
    <ChatMessage  message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. " time="11:40"/>
    <ChatMessage  message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. " time="11:40"/>
    <ChatMessage  message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. " time="11:40"/>
    </div>
    <div
      class="bottom-chat bg-neutral-300 flex justify-center items-center p-4 pl-0"
    >
      <EmojiSelection class="mr-auto ml-3" />
      <input
        class="bg-white text-neutral-800 rounded-lg p-2 w-full ml-3"
        placeholder="Enter message"
      />
      <button
        class="w-12 h-10 ml-5 mr-5 rounded-full btn-send hover:bg-slate-600 text-center text-white"
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
import ChatMessage from "./ChatMessage.vue"

export default {
  name: "TheChat",
  components: {
    ConversationAvatar,
    OnlineDot,
    EmojiSelection,
    ChatMessage
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
.btn-send{
  background-color: #A499B3;
}
</style>
