<template>
  <div
    class="bg-slate-500 select-none flex justify-between items-center mt-5 rounded-xl min-w-[95%] max-w-[95%]"
  >
    <!--flex-none means don't shrink or grow in flex box-->
    <ConversationAvatar
      class="flex-none rounded-lg m-5 w-32 h-32 text-5xl cursor-pointer"
      :letter="conversationName[0]"
    />
    <div class="grow flex flex-row justify-between">
      <div class="flex flex-col justify-center mr-2 text-start">
        <p class="text-white font-medium overflow-hidden truncate text-2xl">
          {{ conversationName }}
          {{
            conversationType == "Contact"
              ? "wants to chat with you"
              : "invites you to join group"
          }}
        </p>
        <p
          v-if="conversationType == 'Contact'"
          class="text-white font-medium overflow-hidden truncate text-2xl"
        ></p>
      </div>
      <div class="flex flex-row items-center justify-center mr-5">
        <button
          @click="accept"
          class="bg-white text-green-500 hover:contrast-75 rounded-full text-6xl m-2 h-12 flex justify-center items-center"
        >
          <font-awesome-icon icon="fa-solid fa-circle-check" />
        </button>
        <button
          @click="decline"
          class="bg-white text-red-500 hover:contrast-75 rounded-full text-6xl m-2 h-12 flex justify-center items-center"
        >
          <font-awesome-icon icon="fa-solid fa-circle-xmark" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "./ConversationAvatar.vue";
export default {
  name: "NotificationBox",
  props: {
    conversationName: {
      type: String,
      required: true,
    },
    conversationType: {
      type: String,
      required: true,
    },
  },
  components: {
    ConversationAvatar,
  },
  methods: {
    accept(){
      this.$emit("accept");
    },
    decline(){
      this.$emit("decline");
    }
  }
};
</script>
