<template>
  <div class="flex flex-col justify-between items-center">
    <p class="white">Selected conversation type is: {{ conversationType }}</p>
    <ConversationBox lastMessage="conversation box sample message"/>

  </div>
</template>

<script>
import ConversationBox from "./ConversationBox.vue"
export default {
  name: "ConversationList",
  components:{
    ConversationBox
  },
  props: {
    conversationType:{
      type: String,
      required: true
    }
  }
}
</script>
