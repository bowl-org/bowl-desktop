<template>
  <div class="relative w-16 h-16 flex items-center justify-center" :class="getNotificationCount < 1 ? 'hidden' : 'show'">
    <div
      class="bg-white w-7 h-7 rounded-full flex justify-center items-center absolute right-0 top-0 z-10"
    >
      <div class="rounded-full bg-red-500 w-5 h-5 flex justify-center items-center">
        <h1 class="font-medium text-white text-base text-center">{{ getNotificationCount }}</h1>
      </div>
      <div class="rounded-full bg-red-500 w-5 h-5 flex justify-center items-center absolute z-0 animate-ping opacity-50"/>
    </div>
    <div
      class="bg-white w-12 h-12 rounded-full flex justify-center items-center"
    >
      <div
        class="bg-neutral-300 text-xl flex select-none w-10 h-10 absolute rounded-full hover:contrast-125 justify-center items-center"
      >
        <button class="w-12 h-12 font-semibold text-center">
          <font-awesome-icon
            icon="fa-solid fa-bell "
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotificationBadge",
  computed: {
    getNotificationCount() {
      return this.$store.getters.notificationCount;
    },
  },
};
</script>
