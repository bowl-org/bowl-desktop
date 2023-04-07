<template>
  <div class="grow flex flex-col justify-center items-center w-3/5">
    <h1 class="text-5xl font-medium text-slate-600 p-5">Add New Contact!</h1>

    <InfoMessage class="absolute top-0 break-keep whitespace-nowrap" :message="infoMessageText" :status="infoMessageStatus" />
    <input
      type="text"
      v-model="emailInput"
      class="bg-neutral-100 text-neutral-800 rounded-lg p-5 w-full text-2xl"
      placeholder="Email"
    />

    <div
      @click="checkEmail"
      class="cursor-pointer send-button hover:contrast-125 select-none flex justify-center items-center p-8 mt-8 m-3 w-5/6  rounded-xl"
    >
      <h1 class="text-xl font-medium ">Send Contact Request</h1>
    </div>
  </div>
</template>
<script>
import validationService from "@/services/validationService";
import InfoMessage from "@/components/InfoMessage.vue";
export default {
  name: "NewContact",
  components: {
    InfoMessage,
  },
  data() {
    return {
      emailInput: "",
      infoMessageText: "",
      infoMessageStatus: "SUCCESS",
    };
  },
  methods: {
    checkEmail() {
      try {
        validationService.validateEmail(this.emailInput);
        this.infoMessageText = "Contact request sent successfully!";
        this.infoMessageStatus = "SUCCESS";
        this.emailInput = "";
      } catch (err) {
        this.infoMessageText = "Invalid email address!";
        this.infoMessageStatus = "FAILURE";
      }
    },
  },
};
</script>
<style>
.send-button{
  background-color: #A499B3;
  color: white;
}
</style>
