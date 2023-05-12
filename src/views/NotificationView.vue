<template>
  <div class="grow flex flex-col items-center mb-5">
    <div
      class="upper-bar flex flex-row justify-center items-center sticky top-0 z-10 bg-white w-full"
    >
      <h1 class="text-5xl font-medium text-slate-600 m-5">Notifications</h1>
      <BackButton class="p-8" goBackCounter="1" />
    </div>
    <NotificationBox
      v-for="(notification, index) in notificationList"
      :key="notification"
      :conversationName="notification.name"
      :conversationType="notification.type"
      @accept="acceptRequest(index)"
      @decline="declineRequest(index)"
    />
  </div>
</template>
<script>
import BackButton from "@/components/BackButton.vue";
import NotificationBox from "@/components/NotificationBox.vue";
import requestNotificationService from "@/services/requestNotificationService";
export default {
  name: "NotifcationView",
  components: {
    BackButton,
    NotificationBox,
  },
  data() {
    return {
      notificationList: [],
    };
  },
  created() {
    this.loadNotifications();
    //Watch changes
    this.$store.watch(
      (state, getters) => getters.notificationCount,
      () => {
        this.loadNotifications();
      }
    );
  },
  methods: {
    async loadNotifications() {
      this.notificationList =
        await requestNotificationService.loadNotifications();
      console.log(this.notificationList);
    },
    async acceptRequest(index) {
      console.log("Accept:", this.notificationList[index]);
      await requestNotificationService.acceptRequest(
        this.notificationList[index]
      );
      this.notificationList.splice(index, 1);
    },
    declineRequest(index) {
      console.log("Decline:", this.notificationList[index]);
      requestNotificationService.declineRequest(this.notificationList[index]);
      this.notificationList.splice(index, 1);
    },
  },
};
</script>
