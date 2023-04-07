<template>
  <div class="grow flex flex-col justify-center items-center w-3/5 ">
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
    />
    <input
      type="text"
      v-model="groupDescription"
      class="bg-neutral-100 text-neutral-800 rounded-lg p-5 mt-5 w-full text-2xl"
      placeholder="Group Description"
    />
    <div
      @click="createGroup"
      class="cursor-pointer create-button hover:contrast-125 select-none flex justify-center items-center p-8 mt-8 m-3 w-5/6  rounded-xl"
    >
      <h1 class="text-xl font-medium">Create</h1>
    </div>
  </div>
</template>
<script>
import InfoMessage from "@/components/InfoMessage.vue";
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
      groupDescription: ""
    };
  },
  methods:{
    createGroup(){
      this.infoMessageText = "Group created successfully!";

    }
  }
};
</script>
<style>
.create-button{
  background-color: #A499B3;
  color: white;
}
</style>
