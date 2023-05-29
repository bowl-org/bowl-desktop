<template>
  <div class="grow">
    <PopupError
      class="h-full"
      ref="popupError"
      @ok="showError = false"
      @alertError="showError = true"
    />
  <div v-if="!showError" class="grow flex flex-col items-center mb-5">
    <div
      class="upper-bar flex flex-row justify-center items-center sticky top-0 z-10 bg-white w-full"
    >
      <h1 class="text-5xl font-medium text-slate-600 m-5">
        Add Member To Group
      </h1>
      <BackButton class="p-8" goBackCounter="1" />
    </div>
    <div class="flex flex-col justify-center items-center">
      <ConversationAvatar
        :letter="group.name.charAt(0)"
        class="w-48 h-48 text-5xl"
      />

      <div class="groupId flex flex-col justify-center items-center">
        <h2 class="text-4xl font-bold text-slate-600 p-5">Group Id:</h2>
        <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
          {{ group.groupId }}
        </p>
      </div>
      <div class="name flex flex-col justify-center items-center">
        <h2 class="text-4xl font-bold text-slate-600 p-5">Group Name:</h2>
        <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
          {{ group.name }}
        </p>
      </div>
      <div class="name flex flex-col justify-center items-center">
        <h2 class="text-4xl font-bold text-slate-600 p-5">
          Group Description:
        </h2>
        <p class="text-4xl font-medium text-slate-600 mx-20 p-5">
          {{ group.description }}
        </p>
      </div>
    </div>

    <div class="public-key flex flex-col justify-center items-center">
      <h2 class="text-4xl font-bold text-slate-600 p-5 w-full">Key:</h2>
      <p class="text-4xl font-medium text-slate-600 p-5 mx-20 break-all">
        {{ group.groupKey }}
      </p>
    </div>
    <div class="bg-gray-300 rounded-xl p-5 m-5">
      <input
        type="text"
        v-model="emailInput"
        class="bg-neutral-100 text-neutral-800 rounded-lg p-5 w-full text-2xl"
        placeholder="Email"
        @keyup.enter="sendMemberRequest"
      />

      <button
        @click="sendMemberRequest"
        class="cursor-pointer bg-green-500 p-8 mt-8 m-3 text-2xl w-5/6 rounded-xl"
      >
        Send Member Request
      </button>
    </div>
  </div>
  </div>
</template>
<script>
import PopupError from "@/components/PopupError";
import BackButton from "@/components/BackButton";
import ConversationAvatar from "@/components/ConversationAvatar";
import socketService from "@/services/socketService";
export default {
  name: "AddMemberView",
  components: {
    BackButton,
    PopupError,
    ConversationAvatar,
  },
  data() {
    return {
      isEditingName: false,
      showError: false,
      emailInput: "",
      group: {}
    };
  },
  computed: {
  },
  created() {
    let activeGroup = this.$store.getters.getConversationByIndex(
      this.$store.getters.activeConversationIndex
    );
    console.log("Active group:", activeGroup);
    this.group = activeGroup;
  },
  methods: {
    async sendMemberRequest() {
      try {
        console.log("Mail:", this.emailInput);
        await socketService.sendGroupRequest(this.emailInput);
      } catch (err) {
        this.$refs.popupError.alertError(err);
      }
    },
  },
};
</script>
