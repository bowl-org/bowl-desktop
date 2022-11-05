<template>
  <div class="conversation-box flex pt-5 pb-5 mt-5 mb-5 rounded-xl ">
    <ConversationAvatar letter="G" />
    <div class="flex flex-col justify-center">
      <p class="text-center">
        {{ lastMessage }}
      </p>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "./ConversationAvatar.vue";
export default {
  name: "ConversationBox",
  props: {
    lastMessage: {
      type: String,
    },
  },
  components: {
    ConversationAvatar,
  },
};
</script>
<style>
.conversation-box {
  background-color: #435177;
}
</style>
