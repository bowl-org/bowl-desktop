<template>
  <div class="flex flex-col items-center justify-between grow">
    <div class="flex flex-row justify-between items-center p-5 sticky top-0">
      <h1 class="text-5xl font-medium text-slate-600 m-5">
        Create New Conversation!
      </h1>
      <BackButton class="p-8" :goBackCounter="goBackCounter" />
    </div>
    <router-view class="grow"/>
    <div class="flex flex-row items-center justify-center">
      <NewConversationItem
        v-for="(newConversationItem, index) in newConversationList"
        :key="newConversationItem"
        @click="openNewConversationMenu(index)"
        :isActive="newConversationItem.isActive"
        :itemName="newConversationItem.itemName"
      />
    </div>
  </div>
</template>
<script>
import NewConversationItem from "@/components/NewConversationItem.vue";
import BackButton from "@/components/BackButton.vue";
export default {
  name: "NewConversation",
  components: {
    NewConversationItem,
    BackButton,
  },
  data() {
    return {
      goBackCounter: 1,
      newConversationList: [
        {
          itemName: "New Contact",
          isActive: false,
          routeName: "newcontact",
        },
        {
          itemName: "New Group",
          isActive: false,
          routeName: "newgroup",
        },
      ],
    };
  },
  methods: {
    openNewConversationMenu(index) {
      let lastIndex = this.newConversationList.findIndex((x) => x.isActive);
      if (lastIndex != -1) {
        this.newConversationList[lastIndex].isActive = false;
      }
      this.newConversationList[index].isActive = true;
      this.$router.push({ name: this.newConversationList[index].routeName });
      this.goBackCounter += 1;
    },
  },
};
</script>
