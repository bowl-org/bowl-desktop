<template>
  <div class="flex flex-col justify-center">
    <!--<h1 class="text-3xl font-medium text-slate-600 p-5">Profile</h1>-->
    <div class="flex flex-col items-center">
      <ConversationAvatar
        :letter="user.name.charAt(0)"
        class="w-48 h-48 text-5xl mb-5"
      />
    </div>
    <div class="bg-gray-300 rounded-xl p-5 m-5">
      <div class="flex flex-row justify-between items-center pb-5">
        <div class="flex flex-col items-start">
          <h2 class="text-3xl font-bold text-slate-600 pb-5">Name</h2>
          <p
            v-if="!isEditingName"
            class="text-3xl font-medium text-slate-600 break-all"
          >
            {{ user.name }}
          </p>
          <input
            v-if="isEditingName"
            type="text"
            v-model="name"
            class="text-3xl font-medium text-slate-600 w-56"
            @keyup.enter="saveName"
          />
        </div>
        <button
          v-if="!isEditingName"
          @click="editName"
          class="text-2xl font-bold text-slate-700 p-5 bg-neutral-200 rounded-xl hover:bg-neutral-100 w-28"
        >
          Edit
        </button>
        <div v-if="isEditingName">
          <button
            @click="saveName"
            class="text-2xl font-bold text-slate-700 p-5 bg-neutral-200 rounded-xl hover:bg-blue-300 w-28 mr-5"
          >
            Save
          </button>
          <button
            @click="isEditingName = false"
            class="text-2xl font-bold text-slate-700 p-5 bg-neutral-200 rounded-xl hover:bg-red-300 w-28"
          >
            Cancel
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center pb-5">
        <div class="flex flex-col items-start">
          <h2 class="text-3xl font-bold text-slate-600 pb-5">Email:</h2>
          <p class="text-3xl font-medium text-slate-600 break-all">
            {{ user.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userService from "@/services/userService";
import ConversationAvatar from "../components/ConversationAvatar.vue";
export default {
  name: "TheProfile",
  components: {
    ConversationAvatar,
  },
  data() {
    return {
      isEditingName: false,
      name: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  created() {
    this.name = this.user.name;
  },
  methods: {
    editName() {
      this.isEditingName = true;
    },
    async saveName() {
      this.isEditingName = false;
      try {
        console.log("New name:", this.name);
        await userService.updateCurrentUserDetail(this.name);
      } catch (err) {
        console.log("Save name error:", err);
      }
    },
  },
};
</script>
