<template>
  <!--More options container is relative to sidebar because i want to component be fixed position while scrolling-->
  <div class="the-sidebar flex flex-col w-75 max-h-screen relative">
    <div class="upper-sidebar flex items-center justify-between">
      <ConversationAvatar letter="O" class="m-5" />
      <div class="upper-rigth-sidebar flex flex-col items-center">
        <button class="w-12 h-12 text-4xl m-3 text-center text-white">
          <font-awesome-icon
            icon="fa-solid fa-gear "
            class="hover:animate-spin"
          />
        </button>
      </div>
    </div>
    <SearchSidebar />
    <ConversationTypeMenu @getConversationType="setConversationType($event)" />
    <div class="conversations-container overflow-auto max-h-screen ">

      <div class="more-options-container flex justify-end items-center absolute right-0 bottom-0 ">
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
      <ConversationList :conversationType="conversationType" />
    </div>
  </div>
</template>

<script>
import ConversationAvatar from "./ConversationAvatar.vue";
import SearchSidebar from "./SearchSidebar.vue";
import ConversationTypeMenu from "./ConversationTypeMenu.vue";
import ConversationList from "./ConversationList.vue";

export default {
  name: "TheSidebar",
  components: {
    ConversationAvatar,
    SearchSidebar,
    ConversationTypeMenu,
    ConversationList,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      conversationType: String,
      showMore: false,
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
  background-color: #516088;
}
.chat-btn {
  background-color: #2d202c;
}
</style>
