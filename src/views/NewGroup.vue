<template>
  <div class="grow flex flex-col justify-center items-center w-3/5">
    <h1 class="text-5xl font-medium text-slate-600 p-5">Create New Group!</h1>
    <InfoMessage
      class="absolute top-0 break-keep whitespace-nowrap"
      :message="infoMessageText"
      :status="infoMessageStatus"
    />
    <input
      type="text"
      v-model="groupName"
      class="bg-neutral-100 text-neutral-800 rounded-lg p-5 w-full text-2xl"
      placeholder="Group Name"
      @keyup.enter="createGroup"
    />
    <input
      type="text"
      v-model="groupDescription"
      class="bg-neutral-100 text-neutral-800 rounded-lg p-5 mt-5 w-full text-2xl"
      placeholder="Group Description"
      @keyup.enter="createGroup"
    />
    <div
      @click="createGroup"
      class="cursor-pointer create-button hover:contrast-125 select-none flex justify-center items-center p-8 mt-8 m-3 w-5/6 rounded-xl"
    >
      <h1 class="text-xl font-medium">Create</h1>
    </div>
  </div>
</template>
<script>
import InfoMessage from "@/components/InfoMessage.vue";
import * as apiService from "@/services/apiService";
import groupConversationService from "@/services/groupConversationService";
export default {
  name: "NewGroup",
  components: {
    InfoMessage,
  },
  data() {
    return {
      infoMessageText: "",
      infoMessageStatus: "SUCCESS",
      groupName: "",
      groupDescription: "",
    };
  },
  methods: {
    createGroup() {
      let groupData = {
        name: this.groupName,
        description: this.groupDescription
      };
      apiService
        .POST(
          "/groupChat",
          groupData,
          apiService.generateAuthHeader(this.$store.getters.token.data)
        )
        .then(async (group) => {
          groupData.id = group?.id;
          await groupConversationService.createGroupChat(
            this.$store.getters.user.id,
            groupData
          );
          this.infoMessageText = "Group created succesfully!";
          this.infoMessageStatus = "SUCCESS";
          this.groupName = "";
          this.groupDescription = "";
        })
        .catch((err) => {
          this.infoMessageText = err.message;
          this.infoMessageStatus = "FAILURE";
        });
    },
  },
};
</script>
<style>
.create-button {
  background-color: #a499b3;
  color: white;
}
</style>
