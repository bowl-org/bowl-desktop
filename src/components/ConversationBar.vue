<template>
  <div class="current-chat-box flex items-center">
    <ConversationAvatar :letter="name?.charAt(0)" class="m-5 rounded-md" />
    <div class="chat-box-info">
      <div class="flex items-center">
        <p class="font-medium">{{ name }}</p>
        <button class="fav-btn active:animate-ping" @click="toggleFav">
          <font-awesome-icon
            v-if="isFav == 1"
            icon="fa-solid fa-heart"
            class="pl-3 text-lg fav"
          />
          <font-awesome-icon
            v-else
            icon="fa-regular fa-heart"
            class="pl-3 text-lg fav"
          />
        </button>
      </div>
      <div v-if="conversationType != 'Group'" class="active-info flex items-center">
        <OnlineDot :status="onlineStatus" />
        <p class="text-sm ml-3 text-gray-500">{{ onlineStatus }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import ConversationAvatar from "@/components/ConversationAvatar.vue";
import OnlineDot from "@/components/OnlineDot.vue";
export default {
  name: "ConversationBar",
  components: {
    ConversationAvatar,
    OnlineDot,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    isFav: {
      type: Number,
      required: true,
    },
    onlineStatus: {
      type: String,
    },
    conversationType: {
      type: String,
    },
  },
  methods: {
    toggleFav() {
      this.$emit("toggleFav");
    },
  },
};
</script>
<style>
.fav {
  color: #a499b3;
}
</style>
