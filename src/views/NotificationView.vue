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
  },
  methods: {
    loadNotifications() {
      this.notificationList = [
        {
          name: "Bill Joy",
          type: "Contact",
        },
        {
          name: "Demo Group",
          type: "Group",
        },
        {
          name: "Linus Torvalds",
          type: "Contact",
        },
        {
          name: "Richard Stallman",
          type: "Contact",
        },
        {
          name: "Dennis Ritchie",
          type: "Contact",
        },
      ];
      this.$store.dispatch(
        "setNotificationCount",
        this.notificationList.length
      );
    },
    acceptRequest(index) {
      console.log("Accept:", this.notificationList[index]);
      this.$store.dispatch("decreaseNotificationCount");
      this.notificationList.splice(index, 1);
    },
    declineRequest(index) {
      console.log("Decline:", this.notificationList[index]);
      this.$store.dispatch("decreaseNotificationCount");
      this.notificationList.splice(index, 1);
    },
  },
};
</script>
