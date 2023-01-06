<template>
  <div class="flex flex-col justify-between items-center overflow-x-hidden">
    <p class="white">Selected conversation type is: {{ conversationType }}</p>
    <ConversationBox
      conversationName="Mehmet Ümit Özden"
      onlineStatus="online"
      isActive="true"
      lastMessageTimestamp="01/11/2022"
      lastMessage="conversation box sample message"
    />
    <ConversationBox
      conversationName="Bill Joy"
      lastMessageTimestamp="08/10/2022"
      lastMessage="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt."
    />
    <ConversationBox
      conversationName="Linus Torvalds"
      lastMessageTimestamp="20/08/2022"
      lastMessage="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt."
    />
  </div>
</template>

<script>
import ConversationBox from "./ConversationBox.vue";
export default {
  name: "ConversationList",
  components: {
    ConversationBox,
  },
  props: {
    conversationType: {
      type: String,
      required: true,
    },
  },
};
</script>
