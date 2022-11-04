<template>
  <div class="the-sidebar bg-blue-900">
    <div class="upper-sidebar flex justify-between">
      <ConversationAvatar letter="O"/>
      <div class="upper-rigth-sidebar flex flex-col items-center">
        <button class="w-12 h-12 text-4xl m-3 text-center text-white ">
          <font-awesome-icon icon="fa-solid fa-gear" />
        </button>
        <button
          class="w-8 h-8 m-3 rounded-full bg-sky-500 hover:bg-slate-600 text-white"
          @click="add"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    <SearchSidebar/>
  </div>
</template>

<script>
import ConversationAvatar from "./ConversationAvatar.vue";
import SearchSidebar from "./SearchSidebar.vue";
export default {
  name: "TheSidebar",
  components: {
    ConversationAvatar,
    SearchSidebar
  },
  props: {
    msg: String,
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
</style>
