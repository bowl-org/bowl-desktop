<template>
  <div class="select-none w-12 h-12 relative avatar-container rounded-full hover:contrast-125">
  <button
    class="w-12 h-12 text-xl font-semibold  text-center"
  >
    {{ letter }}
  </button>
  <OnlineDot :class="showOnlineDot != 'true' ? 'hidden' : '' " :status="onlineStatus" class="absolute right-0 bottom-0"/>
  </div>
</template>

<script>
import OnlineDot from "./OnlineDot.vue"
export default {
  name: "ConversationAvatar",
  props: {
    letter: String,
    showOnlineDot: String,
    onlineStatus: String
  },
  components: {
    OnlineDot
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.avatar-container {
  background-color: #534b62;
  color: #a29eab;
}
</style>
