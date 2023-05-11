<template>
  <!--More options container is relative to sidebar because i want to component be fixed position while scrolling-->
  <div class="the-sidebar flex flex-col w-75 max-h-screen relative">
    <div class="upper-sidebar flex items-center justify-between">
      <ConversationAvatar @click="toggleUserMenu" :letter="userName.charAt(0)" class="m-5" />
      <ul
        v-if="showUserMenu"
        class="user-menu shadow-xl border-4 border-neutral-500/40 absolute top-20 left-5 font-medium bg-neutral-200 rounded-md"
      >
        <li
          @click="$router.push({name:'profile'})"
          class="cursor-pointer px-3 py-1 text-left bg-neutral-200 hover:contrast-75"
        >
          Profile
        </li>
        <li
          class="cursor-pointer rounded-b px-3 py-1 text-left bg-neutral-200 hover:contrast-75 hover:text-red-900"
          @click="logOut"
        >
          Log Out
        </li>
      </ul>
      <div class="upper-rigth-sidebar flex flex-row items-center justify-center">
        <NotificationBadge @click="$router.push({name:'notification'})"/>
        <button
          class="settings w-12 h-12 text-4xl m-3 text-center text-white"
          @click="openSettings"
        >
          <font-awesome-icon
            icon="fa-solid fa-gear "
            class="hover:animate-spin"
          />
        </button>
      </div>
    </div>
    <SearchSidebar @updateSearch="updateSearchFilter"/>
    <ConversationTypeMenu @getConversationType="setConversationType($event)" />
    <div class="conversations-container overflow-auto max-h-screen max-w-sm">
      <div
        class="more-options-container flex justify-end items-center absolute right-0 bottom-0"
      >
        <button
          v-if="showMore"
          class="w-8 h-8 m-1 rounded-full bg-sky-500 hover:bg-sky-800 text-white"
          @click="$router.push({name: 'newconversation'})"
        >
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
        <button
          class="w-12 h-12 m-3 text-xl rounded-full bg-sky-500 hover:contrast-75 text-white chat-btn"
          @click="showMore = !showMore"
        >
          <font-awesome-icon icon="fa-regular fa-comment-dots" />
        </button>
      </div>
      <ConversationList :conversationType="conversationType" :searchFilter="searchFilter" />
    </div>
  </div>
</template>

<script>
import ConversationAvatar from "./ConversationAvatar.vue";
import NotificationBadge from "./NotificationBadge.vue";
import SearchSidebar from "./SearchSidebar.vue";
import ConversationTypeMenu from "./ConversationTypeMenu.vue";
import ConversationList from "./ConversationList.vue";
import logInService from "../services/logInService";

export default {
  name: "TheSidebar",
  components: {
    ConversationAvatar,
    SearchSidebar,
    ConversationTypeMenu,
    ConversationList,
    NotificationBadge
  },
  props: {
    msg: String,
  },
  data() {
    return {
      conversationType: "",
      showMore: false,
      showUserMenu: false,
      searchFilter: ""
    };
  },
  computed: {
    userName(){
      return this.$store.getters.user.name;
    }
  },
  methods: {
    updateSearchFilter(searchText){
      this.searchFilter = searchText;
    },
    setConversationType(conversationType) {
      this.conversationType = conversationType;
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    logOut() {
      logInService
        .logOut()
        .then(() => {
          this.$store.dispatch("deleteUser");
          this.$store.dispatch("deleteToken");
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Log out error!", err);
        });
      //Log out
    },
    openSettings() {
      this.$router.push({name: "settings"});
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
