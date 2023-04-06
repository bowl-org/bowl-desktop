<template>
  <div class="flex flex-col justify-center items-center">
    <!--<h1 class="text-3xl font-medium text-slate-600 p-5">Profile</h1>-->
    <ConversationAvatar letter="M" class="w-48 h-48 text-5xl" />
    <div class="name">
      <h2 class="text-3xl font-bold text-slate-600 p-5">Name:</h2>
      <p class="text-3xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ user.name }}
      </p>
    </div>
    <div class="email">
      <h2 class="text-3xl font-bold text-slate-600 p-5 mx-20">Email:</h2>
      <p class="text-3xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ user.email }}
      </p>
    </div>
    <div class="public-key">
      <h2 class="text-3xl font-bold text-slate-600 p-5">Public Key:</h2>
      <p class="text-3xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ user.publicKey }}
      </p>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "../components/ConversationAvatar.vue";
export default {
  name: "TheProfile",
  components: {
    ConversationAvatar,
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    console.log(this.$store.getters.user);
  },
};
</script>
