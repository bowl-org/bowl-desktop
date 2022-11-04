<template>
  <div class="the-sidebar bg-blue-900">
    <div class="upper-sidebar flex justify-between">
      <ConversationAvatar letter="O" />
      <div class="upper-rigth-sidebar flex flex-col items-center">
        <button class="w-12 h-12 text-4xl m-3 text-center text-white">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </button>
      </div>
    </div>
    <SearchSidebar />
    <ConversationTypeMenu @getConversationType="setConversationType($event)" />
    <p class="white">Selected conversation type is: {{ conversationType }}</p>

    <div class="more-options-container flex  justify-end items-center ">
      <button
        v-if="showMore"
        class="w-8 h-8 m-1 rounded-full bg-sky-500 hover:bg-slate-600 text-white"
        @click="add"
      >
        <font-awesome-icon icon="fa-solid fa-plus" />
      </button>
      <button
        class="w-12 h-12 m-3 text-xl rounded-full bg-sky-500 hover:bg-slate-500 text-white chat-btn"
        @click="showMore = !showMore"
      >
        <font-awesome-icon icon="fa-regular fa-comment-dots" />
      </button>
    </div>
  </div>
</template>

<script>
import ConversationAvatar from "./ConversationAvatar.vue";
import SearchSidebar from "./SearchSidebar.vue";
import ConversationTypeMenu from "./ConversationTypeMenu.vue";

export default {
  name: "TheSidebar",
  components: {
    ConversationAvatar,
    SearchSidebar,
    ConversationTypeMenu,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      conversationType: String,
      showMore: true,
    };
  },
  methods: {
    setConversationType(conversationType) {
      this.conversationType = conversationType;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.the-sidebar {
  min-width: 60vh;
  min-height: 100vh;
  background-color: #516088;
}
.chat-btn {
  background-color: #2d202c;
}
</style>
