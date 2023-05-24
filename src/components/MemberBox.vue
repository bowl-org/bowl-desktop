<template>
  <div
    class="select-none bg-neutral-300 flex justify-between items-center mt-5 rounded-xl min-w-full max-w-full"
  >
    <ConversationAvatar
      class="flex-none rounded-lg m-5 w-24 h-24 text-5xl cursor-pointer"
      showOnlineDot="true"
      dotSize="5"
      :letter="name[0]"
      :isOnline="isOnline"
    />
    <div class="flex flex-col justify-center grow ">
      <div class="flex justify-between items-center">
        <p
          class="text-black text-4xl font-medium overflow-hidden truncate w-56 text-base justify-items-start text-start"
        >
          {{ name }}
        </p>
        <div
          v-if="isAdmin"
          class="flex flex-col justify-center items-center font medium text-green-200 bg-green-500 rounded-xl w-24 h-12 mr-5"
        >
          <p class="">{{ "Group Admin" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "./ConversationAvatar.vue";
export default {
  name: "ConversationBox",
  props: {
    isOnline: {
      type: Boolean,
    },
    name: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
  },
  components: {
    ConversationAvatar,
  },
};
</script>
<style>
</style>
