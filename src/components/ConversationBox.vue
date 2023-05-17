<template>
  <div
    @click="openConversation"
    class="cursor-pointer select-none flex justify-between items-center mt-5 rounded-xl min-w-[95%] max-w-[95%]"
    :class="
      isActive
        ? 'conversation-box-active hover:bg-green-100'
        : 'conversation-box-default hover:bg-black/60'
    "
  >
    <!--flex-none means don't shrink or grow in flex box-->
    <ConversationAvatar
      v-if="conversationType == 'Group'"
      class="flex-none rounded-lg m-3 w-12 h-12"
      :letter="conversationName[0]"
    />
    <ConversationAvatar
      v-else-if="conversationType == 'Contact'"
      class="flex-none rounded-lg m-3 w-12 h-12"
      showOnlineDot="true"
      :letter="conversationName[0]"
      :isOnline="isOnline"
    />
    <div class="flex flex-col justify-center grow mr-2">
      <div class="flex justify-between items-center">
        <p
          class="font-medium overflow-hidden truncate w-44 text-base justify-items-start text-start"
          :class="isActive ? 'text-black' : 'text-white'"
        >
          {{ conversationName }}
        </p>

        <div
          class="conversation-info"
          :class="isActive ? 'text-neutral-500' : 'text-neutral-200'"
        >
          <p class="text-xs">{{ lastMessageTimestamp }}</p>
        </div>
      </div>
      <p
        class="text-start text-sm overflow-hidden truncate w-56"
        :class="isActive ? 'text-neutral-500' : 'text-neutral-200'"
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
    isOnline: {
      type: Boolean,
    },
    conversationName: {
      type: String,
      required: true,
    },
    conversationType: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
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
