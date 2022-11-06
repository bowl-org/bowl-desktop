<template>
  <div
    class="flex justify-between items-center mt-5 rounded-xl  max-w-[90%]"
    :class="
      isActive == 'true'
        ? 'conversation-box-active'
        : 'conversation-box-default'
    "
  >
    <!--flex-none means don't shrink or grow in flex box-->
    <ConversationAvatar
      :letter="conversationName[0]"
      class="flex-none rounded-lg m-3 w-12 h-12 grow"
    />
    <div class="flex flex-col justify-center mr-2">
      <div class="flex justify-between ">
        <p
          class="font-medium overflow-hidden truncate w-36 text-base justify-items-start  text-start"
          :class="isActive == 'true' ? 'text-black' : 'text-white'"
        >
          {{ conversationName }}
        </p>

        <div class="conversation-info ">
          <p class="text-xs">{{ lastMessageTimestamp }}</p>
        </div>
      </div>
      <p
        class="text-start text-sm overflow-hidden truncate w-52 "
        :class="isActive == 'true' ? 'text-neutral-500' : 'text-neutral-200'"
      >
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
    lastMessageTimestamp: {
      type: String,
      required: true,
    },
    conversationName: {
      type: String,
      required: true,
    },
    isActive: {
      type: String,
    },
  },
  components: {
    ConversationAvatar,
  },
};
</script>
<style>
.conversation-box-default {
  background-color: #435177;
}
.conversation-box-active {
  background-color: #d1e4e8;
}
</style>
