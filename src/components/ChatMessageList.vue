<template>
  <div class="message-container overflow-auto max-h-screen">
    <ChatMessage
      message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. "
      time="11:40"
    />
    <ChatMessage
      messageType="sent"
      message="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      time="9.40"
    />
    <ChatMessage
      message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. "
      time="11:40"
    />
    <ChatMessage
      messageType="sent"
      message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. "
      time="11:40"
    />
    <ChatMessage
      message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. "
      time="11:40"
    />
    <ChatMessage
      messageType="sent"
      message="Praesent a pretium nisi. Vivamus elementum elit eu nunc pellentesque, eu sodales ex viverra. Sed sit amet nulla orci. Etiam ac nisl ante. Duis tempus metus ut augue interdum, sed bibendum nisl pellentesque. Quisque blandit maximus bibendum. Vestibulum ex lectus, placerat id mollis tempor, auctor ut quam. Integer quis pharetra elit, vel accumsan sapien. Curabitur pulvinar dolor et dui consequat, ut luctus mauris tincidunt. "
      time="11:40"
    />
  </div>
</template>
<script>
import ChatMessage from "./ChatMessage.vue"
export default{
  name: "ChatMessageList",
  components:{
    ChatMessage
  },
  methos:{
    addNewMessage(){

    }
  }
}
</script>
