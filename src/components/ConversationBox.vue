<template>
  <div class="conversation-box flex justify-between items-center mt-5  rounded-xl max-w-[90%] ">
<!--flex-none means don't shrink or grow-->
    <ConversationAvatar letter="G" class="flex-none rounded-lg m-3 w-16 h-16 grow"/>
    <div class="flex flex-col justify-center  ">
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
