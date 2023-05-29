<template>
  <div class="grow flex flex-col  items-center">
    <div
      class="upper-bar flex flex-row justify-center items-center sticky top-0 z-10 bg-white"
    >
      <h1 class="text-5xl font-medium text-slate-600 m-5">Conversation Info</h1>
      <BackButton class="p-8" goBackCounter="2" />
    </div>
    <router-view class="grow" />
    <!--Items-->
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
    let activeConversation = this.$store.getters.getConversationByIndex(
      this.$store.getters.activeConversationIndex
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
