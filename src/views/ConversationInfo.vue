<template>
  <div class="grow flex flex-col justify-center items-center">
    <div class="flex flex-row justify-between items-center p-5">
      <h1 class="text-5xl font-medium text-slate-600 m-5">Conversation Info</h1>
      <BackButton class="p-8" goBackCounter="2" />
    </div>
    <div class="grow">
      <router-view />
      <!--Items-->
    </div>
  </div>
</template>
<script>
import BackButton from "@/components/BackButton.vue";
export default {
  name: "ConversationInfo",
  components: {
    BackButton,
  },
  data() {
    return {};
  },
  created() {
    let activeConversation = this.$store.getters.getConversationById(
      this.$store.getters.activeConversationId
    );
    if (activeConversation.conversationType == "Group") {
      this.$router.push({ name: "groupinfo" });
    } else if (activeConversation.conversationType == "Contact") {
      this.$router.push({ name: "contactinfo" });
    }
  },
  methods: {},
};
</script>
